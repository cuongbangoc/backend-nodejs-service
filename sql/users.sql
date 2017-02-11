CREATE TABLE public.users
(
    u_id serial NOT NULL,
    u_email character(255) NOT NULL,
    u_password character(255) NOT NULL,
    u_salt character(255) NOT NULL,
    u_first_name character(255),
    u_last_name character(255),
    u_type smallint,
    u_is_active smallint,
    PRIMARY KEY (u_id)
)
WITH (
    OIDS = FALSE
)
TABLESPACE pg_default;

ALTER TABLE public.users
    OWNER to demo;