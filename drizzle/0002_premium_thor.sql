CREATE TABLE `products` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`name` text NOT NULL,
	`price` text NOT NULL,
	`price_value` integer NOT NULL,
	`image` text NOT NULL,
	`color` text NOT NULL,
	`switches` text NOT NULL,
	`lights` text NOT NULL,
	`created_at` text NOT NULL,
	`updated_at` text NOT NULL
);
