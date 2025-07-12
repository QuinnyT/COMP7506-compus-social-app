import React, { useState } from 'react';

interface PublishProps {
  isOpen: boolean;
  onClose: () => void;
}

const Publish: React.FC<PublishProps> = ({ isOpen, onClose }) => {
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
  });

  const publishTypes = [
    { id: 'share', label: 'Share', icon: '📝', description: 'Share your thoughts and experiences' },
    { id: 'event', label: 'Organize Event', icon: '🎉', description: 'Create and organize events' },
    { id: 'marketplace', label: 'Sell Item', icon: '💰', description: 'Sell your items to campus community' },
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
    });
    onClose();
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Publishing:', { type: publishType, ...formData });
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

  if (!isOpen) return null;

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
    </form>
  );

  const renderForm = () => {
    switch (publishType) {
      case 'share':
        return renderShareForm();
      case 'event':
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
        renderPublishTypeSelector()
      )}
    </div>
  );
};

export default Publish; 