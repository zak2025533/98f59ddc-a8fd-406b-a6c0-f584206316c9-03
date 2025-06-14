
export interface AnnouncementFormData {
  title: string;
  description: string;
  type: string;
  is_active: boolean;
  start_date: Date | null;
  end_date: Date | null;
  image_url: string;
  video_url: string;
  product_id: string;
  discount_percentage: number | null;
  discount_amount: number | null;
  is_banner: boolean;
  banner_text: string;
}

export interface Announcement {
  id: string;
  title: string;
  description: string | null;
  type: string;
  is_active: boolean;
  start_date: string | null;
  end_date: string | null;
  image_url: string | null;
  video_url: string | null;
  product_id: string | null;
  discount_percentage: number | null;
  discount_amount: number | null;
  is_banner: boolean | null;
  banner_text: string | null;
}

export const getInitialFormData = (): AnnouncementFormData => ({
  title: "",
  description: "",
  type: "general",
  is_active: true,
  start_date: null,
  end_date: null,
  image_url: "",
  video_url: "",
  product_id: "",
  discount_percentage: null,
  discount_amount: null,
  is_banner: false,
  banner_text: "",
});

export const mapAnnouncementToFormData = (announcement: Announcement): AnnouncementFormData => ({
  title: announcement.title,
  description: announcement.description || "",
  type: announcement.type,
  is_active: announcement.is_active,
  start_date: announcement.start_date ? new Date(announcement.start_date) : null,
  end_date: announcement.end_date ? new Date(announcement.end_date) : null,
  image_url: announcement.image_url || "",
  video_url: announcement.video_url || "",
  product_id: announcement.product_id || "",
  discount_percentage: announcement.discount_percentage || null,
  discount_amount: announcement.discount_amount || null,
  is_banner: announcement.is_banner || false,
  banner_text: announcement.banner_text || "",
});
