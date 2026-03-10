
import { BeefShareType, ShareDetail } from './types';

export const BEEF_SHARES: ShareDetail[] = [
  {
    id: 'quarter',
    type: BeefShareType.QUARTER,
    subtitle: 'The Starter',
    weightRange: 'Approx 100-125 lbs',
    storageInfo: 'Fits in standard fridge freezer',
    idealFor: 'Great for individuals or couples',
    iconName: 'kitchen',
    imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAjZZpK6BGRA3Co7Fpl2CwCz63T7jdcjtMAhDWxgR0XjK7-mdjyw9wkHEnUpyUuJjAabtCep4VXY_wDz5p6ZSWgMjY-5wRj95HE1fPYiXRr-C0qKiDjthaoNo4hoQlB8ALrwaCtqldZV74tTZl6clrc9KsSZtvFKk3ReI2kZ1WfpQXh_oOhbAjSdf4XGRB90GmBHN2NMFySzw5uWZF3Ml-735f7hpH1-0G2bu42XEHwzCJZqhL36OqGMobSBztrnW3v5_5ZtbF3vw'
  },
  {
    id: 'half',
    type: BeefShareType.HALF,
    subtitle: 'The Crowd Pleaser',
    weightRange: 'Approx 200-250 lbs',
    storageInfo: 'Needs approx 8 cu. ft. freezer',
    idealFor: 'Ideal for families of 3-4',
    iconName: 'inventory_2',
    isPopular: true,
    imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBLPul8hpzus-zbOw1wY_iSnVYfJDgx3TsZt5v0QBN8UqQEhkmizVxGbCVOCTO0X5RHEq4xJF1nNRpqUPegYzmcPRAR9lu0cDgESYZHsjVFzu8x_hbqWhjSbTl-jDpPN_fW19RePYEIyhZWIL_7aUOJOQrQLvi6LrnMgJGmAGvXNQnlW8LxxY2eaXk5HdVNkHCao4TachEL-Bf4tWiw0YgkWvgRwxuFjQFT-UthNVJKyPkkbJ5yl-yWZSeXPq9fKpxYS9pP5xoU8Q'
  },
  {
    id: 'whole',
    type: BeefShareType.WHOLE,
    subtitle: "The Rancher's Choice",
    weightRange: 'Approx 400-500 lbs',
    storageInfo: 'Requires large chest freezer',
    idealFor: 'Best value for large families',
    iconName: 'door_front',
    imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuA8Sz-0AtiULSv7Z_mb3SpWnntcUqaVAih04qAV_aL1pWcUhpf9dSp86NtiyBTFRKnBf80OcLfdbW0p96q_-28kEBuaPn1xbyPQYvQl9rE3BOcCzJQBmnP_FC_zkAf3vLM_CqEoq6EOgwk9jtdAOT-_GmoFDGxhTr0OrudCKr2zOytdNtc_rVTeC-L6ZTErYAJ5IhX2_2lnCQghSj0i39OHnFjimXZP_is7HYwP2Is7wI-hUOasbxJ-8CcFYS5yCVsnIbbHGQ7qsw'
  }
];

export const LogoIcon = () => (
  <svg fill="currentColor" viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg" className="size-6 text-primary">
    <path d="M24 4C25.7818 14.2173 33.7827 22.2182 44 24C33.7827 25.7818 25.7818 33.7827 24 44C22.2182 33.7827 14.2173 25.7818 4 24C14.2173 22.2182 22.2182 14.2173 24 4Z" />
  </svg>
);
