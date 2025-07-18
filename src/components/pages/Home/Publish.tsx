import React, { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, useMapEvents } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L, { Icon } from 'leaflet';

interface PublishProps {
  isOpen: boolean;
  onClose: () => void;
  defaultType?: string;
  onPublish?: (newPost: any) => void;
}

const Publish: React.FC<PublishProps> = ({ isOpen, onClose, defaultType, onPublish }) => {
  const [publishType, setPublishType] = useState('');
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    content: '',
    eventTime: '',
    location: '',
    capacity: '',
    price: '',
    condition: 'new',
    images: [] as string[],
    tradeMethod: '面交', // 新增字段，默认面交
    courseCode: '',      // 新增字段
    locationLatLng: null as { lat: number; lng: number } | null, // 新增字段
    organizerType: 'personal', // 新增：发起者类型
    eventCategory: 'study-group', // 新增：活动类型
    participants: [] as { id: string; name: string }[], // 新增：参与者信息
    onlineSignup: false, // 新增：线上报名
  });

  const publishTypes = [
    { id: 'share', label: 'Share', icon: '📝', description: 'Share your thoughts and experiences' },
    { id: 'event', label: 'Organize Event', icon: '🎉', description: 'Create and organize events' },
    { id: 'marketplace', label: 'Sell Item', icon: '💰', description: 'Sell your items to campus community' },
  ];

  // 活动类型选项
  const eventCategories = [
    { value: 'study-group', label: 'Study Group' },
    { value: 'self-study', label: 'Self-study Group' },
    { value: 'leisure', label: 'Leisure & Entertainment' },
    { value: 'food', label: 'Food & Restaurant' },
    { value: 'sports', label: 'Sports & Travel' },
  ];

  const handlePublishTypeSelect = (type: string) => {
    setPublishType(type);
    setShowForm(true);
  };

  const handleClose = () => {
    setPublishType('');
    setShowForm(false);
    setFormData({
      title: '',
      content: '',
      eventTime: '',
      location: '',
      capacity: '',
      price: '',
      condition: 'new',
      images: [],
      tradeMethod: '面交',
      courseCode: '',
      locationLatLng: null,
      organizerType: 'personal',
      eventCategory: 'study-group',
      participants: [],
      onlineSignup: false,
    });
    onClose();
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const currentUserId = 'current-user';
    let participants = formData.participants;
    if ((publishType === 'events' || publishType === 'event') && formData.onlineSignup && participants.length === 0) {
      participants = [{ id: currentUserId, name: 'You' }];
    }
    let type = publishType;
    if (publishType === 'events') type = 'event';
    if (publishType === 'marketplace') type = 'marketplace';
    if (publishType === 'share') type = 'share';
    const newPost = {
      id: Date.now(),
      type,
      ...formData,
      participants,
      timestamp: new Date().toISOString(),
      author: 'Current User',
      authorId: currentUserId,
      avatar: 'CU',
      likes: 0,
      comments: 0,
    };
    if (onPublish) onPublish(newPost);
    handleClose();
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files) {
      const newImages = Array.from(files).map(file => URL.createObjectURL(file));
      setFormData(prev => ({
        ...prev,
        images: [...prev.images, ...newImages].slice(0, 9) // 最多9张图片
      }));
    }
  };

  const removeImage = (index: number) => {
    setFormData(prev => ({
      ...prev,
      images: prev.images.filter((_, i) => i !== index)
    }));
  };

  const handleMapClick = (e: any) => {
    setFormData(prev => ({
      ...prev,
      locationLatLng: { lat: e.latlng.lat, lng: e.latlng.lng }
    }));
  };

  function LocationSelector() {
    useMapEvents({
      click: handleMapClick
    });
    return null;
  }

  const markerIcon = new Icon({
    iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
    shadowSize: [41, 41]
  });

  // 如果有defaultType，直接渲染对应表单
  useEffect(() => {
    if (isOpen && defaultType) {
      setPublishType(defaultType);
      setShowForm(true);
    } else if (!isOpen) {
      setPublishType('');
      setShowForm(false);
    }
  }, [isOpen, defaultType]);

  if (!isOpen) return null;

  // 没有defaultType时才显示类型选择
  const renderPublishTypeSelector = () => (
    <div className="bg-card rounded-lg w-full w-[80vw] max-h-[80vh] p-6">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold text-foreground">What would you like to share?</h2>
        <button 
          onClick={handleClose}
          className="text-muted-foreground hover:text-foreground"
        >
          ✕
        </button>
      </div>
      
      <div className="space-y-3">
        {publishTypes.map((type) => (
          <button
            key={type.id}
            onClick={() => handlePublishTypeSelect(type.id)}
            className="w-full p-4 border border-border rounded-lg hover:bg-muted/50 transition-colors text-left"
          >
            <div className="flex items-center gap-3">
              <span className="text-2xl">{type.icon}</span>
              <div className="flex-1">
                <h3 className="font-medium text-foreground">{type.label}</h3>
                <p className="text-sm text-muted-foreground">{type.description}</p>
              </div>
            </div>
          </button>
        ))}
      </div>
    </div>
  );

  const renderShareForm = () => (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-foreground mb-2">
          What's on your mind?
        </label>
        <textarea
          value={formData.content}
          onChange={(e) => setFormData({...formData, content: e.target.value})}
          className="w-full p-3 border border-border rounded-lg bg-background text-foreground resize-none"
          rows={4}
          placeholder="Share your thoughts, experiences, or recommendations..."
          required
        />
      </div>
      
      <div>
        <label className="block text-sm font-medium text-foreground mb-2">
          Add Photos or Video (Max 9 photos or 1 video)
        </label>
        <div className="space-y-3">
          <div className="border-2 border-dashed border-border rounded-lg p-6 text-center">
            <input
              type="file"
              multiple
              accept="image/*,video/*"
              onChange={handleImageUpload}
              className="hidden"
              id="image-upload"
            />
            <label htmlFor="image-upload" className="cursor-pointer">
              <span className="text-muted-foreground">Tap to add photos or video</span>
            </label>
          </div>
          
          {formData.images.length > 0 && (
            <div className="grid grid-cols-3 gap-2">
              {formData.images.map((image, index) => (
                <div key={index} className="relative">
                  <img
                    src={image}
                    alt={`Upload ${index + 1}`}
                    className="w-full h-24 object-cover rounded-lg"
                  />
                  <button
                    type="button"
                    onClick={() => removeImage(index)}
                    className="absolute -top-2 -right-2 w-6 h-6 bg-red-500 text-white rounded-full text-xs"
                  >
                    ✕
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </form>
  );

  const renderEventForm = () => (
    <form onSubmit={handleSubmit} className="space-y-4">
      {/* 发起者类型 */}
      <div>
        <label className="block text-sm font-medium text-foreground mb-2">
          Organizer Type
        </label>
        <select
          value={formData.organizerType}
          onChange={e => setFormData({ ...formData, organizerType: e.target.value })}
          className="w-full p-3 border border-border rounded-lg bg-background text-foreground"
        >
          <option value="personal">Personal Account</option>
          <option value="organization">Student Organization</option>
        </select>
      </div>
      {/* 活动类型 */}
      <div>
        <label className="block text-sm font-medium text-foreground mb-2">
          Event Category
        </label>
        <select
          value={formData.eventCategory}
          onChange={e => setFormData({ ...formData, eventCategory: e.target.value })}
          className="w-full p-3 border border-border rounded-lg bg-background text-foreground"
        >
          {eventCategories.map(cat => (
            <option key={cat.value} value={cat.value}>{cat.label}</option>
          ))}
        </select>
      </div>
      {/* 课程代码关联 */}
      <div>
        <label className="block text-sm font-medium text-foreground mb-2">
          Course Code (optional)
        </label>
        <input
          type="text"
          value={formData.courseCode}
          onChange={e => setFormData({ ...formData, courseCode: e.target.value })}
          className="w-full p-3 border border-border rounded-lg bg-background text-foreground"
          placeholder="e.g. COMP7506"
        />
      </div>
      {/* 线上报名 */}
      <div className="flex items-center gap-2">
        <input
          type="checkbox"
          checked={formData.onlineSignup}
          onChange={e => setFormData({ ...formData, onlineSignup: e.target.checked })}
          id="online-signup"
        />
        <label htmlFor="online-signup" className="text-sm text-foreground">Enable Online Signup</label>
      </div>
      {/* 只有勾选线上报名时才显示实时状态设置 */}
      {formData.onlineSignup && (
        <div className="bg-muted/50 rounded-lg p-3">
          <div className="flex items-center gap-4 mb-2">
            <span className="text-primary">👥</span>
            <span className="text-foreground text-sm">Participants: {formData.participants.length} / {formData.capacity || '-'}</span>
            <span className="text-foreground text-sm">Missing: {formData.capacity ? Math.max(0, Number(formData.capacity) - formData.participants.length) : '-'}</span>
          </div>
          {formData.participants.length > 0 && (
            <div className="flex flex-wrap gap-2 mt-2">
              {formData.participants.map(p => (
                <span key={p.id} className="bg-primary/10 text-primary px-2 py-1 rounded-full text-xs">{p.name}</span>
              ))}
            </div>
          )}
        </div>
      )}
      {/* 其余表单项保持原有 */}
      <div>
        <label className="block text-sm font-medium text-foreground mb-2">
          Event Title
        </label>
        <input
          type="text"
          value={formData.title}
          onChange={(e) => setFormData({...formData, title: e.target.value})}
          className="w-full p-3 border border-border rounded-lg bg-background text-foreground"
          placeholder="Enter event title"
          required
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-foreground mb-2">
          Description
        </label>
        <textarea
          value={formData.content}
          onChange={(e) => setFormData({...formData, content: e.target.value})}
          className="w-full p-3 border border-border rounded-lg bg-background text-foreground resize-none"
          rows={3}
          placeholder="Describe your event..."
          required
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-foreground mb-2">
          Date & Time
        </label>
        <input
          type="datetime-local"
          value={formData.eventTime}
          onChange={(e) => setFormData({...formData, eventTime: e.target.value})}
          className="w-full p-3 border border-border rounded-lg bg-background text-foreground"
          required
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-foreground mb-2">
          Location
        </label>
        <input
          type="text"
          value={formData.location}
          onChange={(e) => setFormData({...formData, location: e.target.value})}
          className="w-full p-3 border border-border rounded-lg bg-background text-foreground"
          placeholder="Enter event location"
          required
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-foreground mb-2">
          Capacity
        </label>
        <input
          type="number"
          value={formData.capacity}
          onChange={(e) => setFormData({...formData, capacity: e.target.value})}
          className="w-full p-3 border border-border rounded-lg bg-background text-foreground"
          placeholder="Maximum number of participants"
          required
        />
      </div>
    </form>
  );

  const renderMarketplaceForm = () => (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-foreground mb-2">
          Item Name
        </label>
        <input
          type="text"
          value={formData.title}
          onChange={(e) => setFormData({...formData, title: e.target.value})}
          className="w-full p-3 border border-border rounded-lg bg-background text-foreground"
          placeholder="Enter item name"
          required
        />
      </div>
      
      <div>
        <label className="block text-sm font-medium text-foreground mb-2">
          Description
        </label>
        <textarea
          value={formData.content}
          onChange={(e) => setFormData({...formData, content: e.target.value})}
          className="w-full p-3 border border-border rounded-lg bg-background text-foreground resize-none"
          rows={3}
          placeholder="Describe your item..."
          required
        />
      </div>
      
      <div>
        <label className="block text-sm font-medium text-foreground mb-2">
          Price
        </label>
        <input
          type="text"
          value={formData.price}
          onChange={(e) => setFormData({...formData, price: e.target.value})}
          className="w-full p-3 border border-border rounded-lg bg-background text-foreground"
          placeholder="Enter price"
          required
        />
      </div>
      
      {/* 新增：交易方式 */}
      <div>
        <label className="block text-sm font-medium text-foreground mb-2">
          Trade Method
        </label>
        <select
          value={formData.tradeMethod}
          onChange={(e) => setFormData({...formData, tradeMethod: e.target.value})}
          className="w-full p-3 border border-border rounded-lg bg-background text-foreground"
          required
        >
          <option value="Face-to-face">Face-to-face</option>
          <option value="Delivery">Delivery</option>
        </select>
      </div>
      {/* 新增：课程代码 */}
      <div>
        <label className="block text-sm font-medium text-foreground mb-2">
          Course Code
        </label>
        <input
          type="text"
          value={formData.courseCode}
          onChange={(e) => setFormData({...formData, courseCode: e.target.value})}
          className="w-full p-3 border border-border rounded-lg bg-background text-foreground"
          placeholder="e.g. COMP7506"
        />
      </div>
      {/* 新增：地图选点 */}
      <div>
        <label className="block text-sm font-medium text-foreground mb-2">
          Select Transaction Location (Click on the map to mark)
        </label>
        <div className="w-full h-64 rounded-lg overflow-hidden border border-border">
          {/* @ts-ignore */}
          <MapContainer
            center={formData.locationLatLng || { lat: 22.2838, lng: 114.1371 }}
            zoom={13}
            style={{ height: '100%', width: '100%' }}
          >
            {/* @ts-ignore */}
            <TileLayer
              // @ts-ignore
              attribution='&copy; OpenStreetMap contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            <LocationSelector />
            {formData.locationLatLng && (
              // @ts-ignore
              <Marker position={formData.locationLatLng} icon={markerIcon} />
            )}
          </MapContainer>
        </div>
        {formData.locationLatLng && (
          <div className="text-xs text-muted-foreground mt-1">
            Selected: {formData.locationLatLng.lat.toFixed(5)}, {formData.locationLatLng.lng.toFixed(5)}
          </div>
        )}
      </div>
      <div>
        <label className="block text-sm font-medium text-foreground mb-2">
          Add Photos
        </label>
        <div className="space-y-3">
          <div className="border-2 border-dashed border-border rounded-lg p-6 text-center">
            <input
              type="file"
              multiple
              accept="image/*"
              onChange={handleImageUpload}
              className="hidden"
              id="marketplace-image-upload"
            />
            <label htmlFor="marketplace-image-upload" className="cursor-pointer">
              <span className="text-muted-foreground">Tap to add photos</span>
            </label>
          </div>
          
          {formData.images.length > 0 && (
            <div className="grid grid-cols-3 gap-2">
              {formData.images.map((image, index) => (
                <div key={index} className="relative">
                  <img
                    src={image}
                    alt={`Upload ${index + 1}`}
                    className="w-full h-24 object-cover rounded-lg"
                  />
                  <button
                    type="button"
                    onClick={() => removeImage(index)}
                    className="absolute -top-2 -right-2 w-6 h-6 bg-red-500 text-white rounded-full text-xs"
                  >
                    ✕
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
      <div>
        <label className="block text-sm font-medium text-foreground mb-2">
          Condition
        </label>
        <select
          value={formData.condition}
          onChange={(e) => setFormData({...formData, condition: e.target.value})}
          className="w-full p-3 border border-border rounded-lg bg-background text-foreground"
          required
        >
          <option value="new">New</option>
          <option value="like-new">Like New</option>
          <option value="good">Good</option>
          <option value="fair">Fair</option>
        </select>
      </div>
    </form>
  );

  const renderForm = () => {
    switch (publishType) {
      case 'share':
        return renderShareForm();
      case 'events':
        return renderEventForm();
      case 'marketplace':
        return renderMarketplaceForm();
      default:
        return null;
    }
  };

  const getFormTitle = () => {
    switch (publishType) {
      case 'share':
        return 'Share Post';
      case 'event':
        return 'Create Event';
      case 'marketplace':
        return 'Sell Item';
      default:
        return '';
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      {showForm ? (
        <div className="bg-card rounded-lg w-full w-[80vw] max-h-[80vh] overflow-y-auto">
          <div className="p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold text-foreground">{getFormTitle()}</h2>
              <button 
                onClick={handleClose}
                className="text-muted-foreground hover:text-foreground"
              >
                ✕
              </button>
            </div>

            {renderForm()}

            <button
              onClick={handleSubmit}
              className="w-full bg-primary text-primary-foreground py-3 rounded-lg font-medium hover:bg-primary/90 transition-colors mt-6"
            >
              Publish
            </button>
          </div>
        </div>
      ) : (
        !defaultType && renderPublishTypeSelector()
      )}
    </div>
  );
};

export default Publish; 