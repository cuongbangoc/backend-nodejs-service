CREATE TABLE public.demo
(
    id serial NOT NULL,
    name character(255),
    PRIMARY KEY (id)
)
WITH (
    OIDS = FALSE
)
TABLESPACE pg_default;

ALTER TABLE public.demo
    OWNER to demo;

-- Insert demo data
INSERT INTO public.demo (name) VALUES ('Cuong Ba'), ('Huy Nguyen');