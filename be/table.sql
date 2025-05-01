create table users (
    id varchar(36) primary key,
    username varchar(100) not null,
    email varchar(100) not null,
    password varchar(255) not null,
    created_at timestamp default current_timestamp,
    updated_at timestamp default current_timestamp
),

 create table profiles (
    id varchar(36) primary key,
    name varchar(100) not null,
    about varchar(255) not null,
    avatar_image varchar(255),
    social_media_url varchar(255) not null,
    background_image varchar(255),
    user_id varchar(36) references users(id),
    created_at timestamp default current_timestamp,
    updated_at timestamp default current_timestamp
 ),

 create table cards (
    id varchar(36) primary key,
    country varchar(100) not null,
    first_name varchar(100) not null,
    last_name varchar(100) not null,
    card_number varchar(100) not null,
    expiry_year varchar(4) not null,
    expiry_month varchar(2) not null,
    cvv varchar(3) not null,
    user_id varchar(36) references users(id),
    created_at timestamp default current_timestamp,
    updated_at timestamp default current_timestamp
 ),

 create table donations (
    id varchar(36) primary key,
    amount integer not null,
    special_message varchar(255) not null,
    social_media_url varchar(255) not null,
    donor_id varchar(36) references users(id),
    recipient_id varchar(36) references users(id),
    created_at timestamp default current_timestamp
 ),

SELECT users.id, users.username, profile.id, profiles.name, profiles.avatar_image, profiles.social_media_url , profiles.background_image
FROM users
FULL JOIN profiles ON profiles.user_id = users.id;

--  create table users (
--     id varchar(36) primary key,
--     username varchar(100) not null,
--     email varchar(100) not null,
--     password varchar(255) not null,
--     profile_id varchar(36) primary key,
--     name varchar(100),
--     about varchar(255),
--     avatar_image varchar(255),
--     social_media_url varchar(255),
--     background_image varchar(255),
--     created_at timestamp default current_timestamp,
--     updated_at timestamp default current_timestamp
-- ),

INSERT INTO users 
(id, username, email, password)
VALUES
('narangerel', 'narangerel', 'narangerel', 'narangerel'),

INSERT INTO profiles
(id, name, about, social_media_url, user_id)
VALUES
(gen_random_uuid(), 'narangerel', 'narangerel', 'narangerel')

INSERT INTO cards
(id, country, first_name, last_name, card_number, expiry_month, expiry_year, cvv)
VALUES
(gen_random_uuid(), 'narangerel', 'narangerel', 'narangerel', '123456789012', '12', '1234', '123')


    SELECT profiles.name, donations.amount, donations.created_at, donations.social_media_url 
    FROM donations
    FULL JOIN profiles ON profiles.user_id = donations.donor_id 