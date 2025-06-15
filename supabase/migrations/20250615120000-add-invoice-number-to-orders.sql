
ALTER TABLE public.orders
ADD COLUMN invoice_number BIGSERIAL UNIQUE;

