export type LSProductTypes = {
  type: string;
  id: string;
  attributes: {
    store_id: number;
    name: string;
    slug: string;
    description: string;
    status: string;
    status_formatted: string;
    thumb_url: string | null;
    large_thumb_url: string | null;
    price: number;
    price_formatted: string;
    from_price: number | null;
    to_price: number | null;
    pay_what_you_want: boolean;
    buy_now_url: string;
    from_price_formatted: string | null;
    to_price_formatted: string | null;
    created_at: string;
    updated_at: string;
    test_mode: boolean;
  };
  relationships: {
    store: {
      links: {
        self: string;
      };
    };
    variants: {
      links: {
        self: string;
      };
    };
  };
  links: {
    self: string;
  };
};
