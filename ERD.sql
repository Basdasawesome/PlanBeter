CREATE TABLE `users` (
  `id` bigint PRIMARY KEY AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `email` varchar(255) UNIQUE NOT NULL,
  `password` varchar(255),
  `remember_token` varchar(100),
  `created_at` timestamp,
  `updated_at` timestamp
);

CREATE TABLE `groups` (
  `id` bigint PRIMARY KEY AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `created_by` bigint NOT NULL,
  `created_at` timestamp,
  `updated_at` timestamp
);

CREATE TABLE `group_user` (
  `group_id` bigint NOT NULL,
  `user_id` bigint NOT NULL,
  `role` varchar(255) NOT NULL DEFAULT 'member' COMMENT '''admin'' | ''member''',
  `created_at` timestamp,
  `updated_at` timestamp,
  PRIMARY KEY (`group_id`, `user_id`)
);

CREATE TABLE `events` (
  `id` bigint PRIMARY KEY AUTO_INCREMENT,
  `group_id` bigint NOT NULL,
  `created_by` bigint NOT NULL,
  `title` varchar(255) NOT NULL,
  `description` text,
  `is_recurring` boolean NOT NULL DEFAULT false,
  `recurrence_type` varchar(255) COMMENT '''daily'' | ''weekly'' | ''monthly'' | ''yearly''',
  `recurrence_ends_at` date,
  `is_confirmed` boolean NOT NULL DEFAULT false,
  `selected_id` bigint,
  `created_at` timestamp,
  `updated_at` timestamp
);

CREATE TABLE `date_options` (
  `id` bigint PRIMARY KEY AUTO_INCREMENT,
  `event_id` bigint NOT NULL,
  `date` date NOT NULL,
  `starts_at` time,
  `ends_at` time,
  `created_at` timestamp,
  `updated_at` timestamp
);

CREATE TABLE `availabilities` (
  `date_option_id` bigint NOT NULL,
  `user_id` bigint NOT NULL,
  `status` varchar(255) NOT NULL COMMENT '''yes'' | ''maybe'' | ''no''',
  `created_at` timestamp,
  `updated_at` timestamp,
  PRIMARY KEY (`date_option_id`, `user_id`)
);

CREATE TABLE `reminders` (
  `id` bigint PRIMARY KEY AUTO_INCREMENT,
  `event_id` bigint NOT NULL,
  `sent_by` bigint COMMENT 'null for automatic reminders',
  `is_automatic` boolean NOT NULL DEFAULT false,
  `sent_at` timestamp NOT NULL,
  `created_at` timestamp,
  `updated_at` timestamp
);

CREATE TABLE `calendar_connections` (
  `id` bigint PRIMARY KEY AUTO_INCREMENT,
  `user_id` bigint NOT NULL,
  `provider` varchar(255) NOT NULL COMMENT '''google'' | ''apple'' | ''outlook''',
  `access_token` text NOT NULL,
  `refresh_token` text,
  `synced_at` timestamp,
  `created_at` timestamp,
  `updated_at` timestamp
);

CREATE TABLE `event_logs` (
  `id` bigint PRIMARY KEY AUTO_INCREMENT,
  `event_id` bigint NOT NULL,
  `changed_by` bigint NOT NULL,
  `description` text NOT NULL,
  `created_at` timestamp,
  `updated_at` timestamp
);

CREATE UNIQUE INDEX `group_user_index_0` ON `group_user` (`group_id`, `user_id`);

CREATE UNIQUE INDEX `availabilities_index_1` ON `availabilities` (`date_option_id`, `user_id`);

CREATE UNIQUE INDEX `calendar_connections_index_2` ON `calendar_connections` (`user_id`, `provider`);

ALTER TABLE `groups` ADD FOREIGN KEY (`created_by`) REFERENCES `users` (`id`);

ALTER TABLE `group_user` ADD FOREIGN KEY (`group_id`) REFERENCES `groups` (`id`);

ALTER TABLE `group_user` ADD FOREIGN KEY (`user_id`) REFERENCES `users` (`id`);

ALTER TABLE `events` ADD FOREIGN KEY (`group_id`) REFERENCES `groups` (`id`);

ALTER TABLE `events` ADD FOREIGN KEY (`created_by`) REFERENCES `users` (`id`);

ALTER TABLE `events` ADD FOREIGN KEY (`selected_id`) REFERENCES `date_options` (`id`);

ALTER TABLE `date_options` ADD FOREIGN KEY (`event_id`) REFERENCES `events` (`id`);

ALTER TABLE `availabilities` ADD FOREIGN KEY (`date_option_id`) REFERENCES `date_options` (`id`);

ALTER TABLE `availabilities` ADD FOREIGN KEY (`user_id`) REFERENCES `users` (`id`);

ALTER TABLE `reminders` ADD FOREIGN KEY (`event_id`) REFERENCES `events` (`id`);

ALTER TABLE `reminders` ADD FOREIGN KEY (`sent_by`) REFERENCES `users` (`id`);

ALTER TABLE `calendar_connections` ADD FOREIGN KEY (`user_id`) REFERENCES `users` (`id`);

ALTER TABLE `event_logs` ADD FOREIGN KEY (`event_id`) REFERENCES `events` (`id`);

ALTER TABLE `event_logs` ADD FOREIGN KEY (`changed_by`) REFERENCES `users` (`id`);
