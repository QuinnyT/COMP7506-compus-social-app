import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const convertFileToUrl = (file: File) => URL.createObjectURL(file);

export function formatDateString(dateString: string) {
  const options: Intl.DateTimeFormatOptions = {
    year: "numeric",
    month: "short",
    day: "numeric",
  };

  const date = new Date(dateString);
  const formattedDate = date.toLocaleDateString("en-US", options);

  const time = date.toLocaleTimeString([], {
    hour: "numeric",
    minute: "2-digit",
  });

  return `${formattedDate} at ${time}`;
}

// 多格式时间显示
export const multiFormatDateString = (timestamp: string = ""): string => {
  const timestampNum = Math.round(new Date(timestamp).getTime() / 1000);
  const date: Date = new Date(timestampNum * 1000);
  const now: Date = new Date();

  const diff: number = now.getTime() - date.getTime();
  const diffInSeconds: number = diff / 1000;
  const diffInMinutes: number = diffInSeconds / 60;
  const diffInHours: number = diffInMinutes / 60;
  const diffInDays: number = diffInHours / 24;

  switch (true) {
    case Math.floor(diffInDays) >= 30:
      return formatDateString(timestamp);
    case Math.floor(diffInDays) === 1:
      return `${Math.floor(diffInDays)} day ago`;
    case Math.floor(diffInDays) > 1 && diffInDays < 30:
      return `${Math.floor(diffInDays)} days ago`;
    case Math.floor(diffInHours) >= 1:
      return `${Math.floor(diffInHours)} hours ago`;
    case Math.floor(diffInMinutes) >= 1:
      return `${Math.floor(diffInMinutes)} minutes ago`;
    default:
      return "Just now";
  }
};

export const checkIsLiked = (likeList: string[], userId: string) => {
  return likeList.includes(userId);
};

// 校园应用专用工具函数

// 验证学校邮箱
export const validateSchoolEmail = (email: string): boolean => {
  const schoolDomains = [
    '@hku.hk',
    '@connect.hku.hk',
    '@cuhk.edu.hk',
    '@ust.hk',
    '@polyu.edu.hk',
    '@cityu.edu.hk',
    '@hkb.edu.hk',
    '@hksyu.edu.hk',
    '@hsu.edu.hk',
    '@ouhk.edu.hk',
    '@eduhk.hk',
    '@hkuct.edu.hk'
  ];
  
  return schoolDomains.some(domain => email.toLowerCase().includes(domain));
};

// 验证手机号格式
export const validatePhoneNumber = (phone: string): boolean => {
  const phoneRegex = /^[+]?[1-9]\d{1,14}$/;
  return phoneRegex.test(phone.replace(/\s/g, ''));
};

// 格式化手机号显示
export const formatPhoneNumber = (phone: string): string => {
  const cleaned = phone.replace(/\D/g, '');
  const match = cleaned.match(/^(\d{4})(\d{3})(\d{3})$/);
  if (match) {
    return `${match[1]} ${match[2]} ${match[3]}`;
  }
  return phone;
};

// 获取校区列表
export const getCampusList = () => [
  { id: 'hku_main', name: '香港大学主校区', code: 'HKU_MAIN' },
  { id: 'hku_medical', name: '香港大学医学院', code: 'HKU_MEDICAL' },
  { id: 'cuhk_main', name: '香港中文大学主校区', code: 'CUHK_MAIN' },
  { id: 'ust_main', name: '香港科技大学主校区', code: 'UST_MAIN' },
  { id: 'polyu_main', name: '香港理工大学主校区', code: 'POLYU_MAIN' },
  { id: 'cityu_main', name: '香港城市大学主校区', code: 'CITYU_MAIN' },
  { id: 'hkb_main', name: '香港浸会大学主校区', code: 'HKB_MAIN' },
  { id: 'hksyu_main', name: '香港树仁大学主校区', code: 'HKSYU_MAIN' },
  { id: 'hsu_main', name: '香港恒生大学主校区', code: 'HSU_MAIN' },
  { id: 'ouhk_main', name: '香港公开大学主校区', code: 'OUHK_MAIN' },
  { id: 'eduhk_main', name: '香港教育大学主校区', code: 'EDUHK_MAIN' },
  { id: 'hkuct_main', name: '香港都会大学主校区', code: 'HKUCT_MAIN' }
];

// 获取帖子类型显示名称
export const getPostTypeLabel = (type: string): string => {
  const typeLabels = {
    'share': '分享',
    'event': '活动',
    'marketplace': '二手'
  };
  return typeLabels[type as keyof typeof typeLabels] || '分享';
};

// 获取帖子类型图标
export const getPostTypeIcon = (type: string): string => {
  const typeIcons = {
    'share': '/assets/icons/share.svg',
    'event': '/assets/icons/event.svg',
    'marketplace': '/assets/icons/marketplace.svg'
  };
  return typeIcons[type as keyof typeof typeIcons] || '/assets/icons/share.svg';
}; 