CREATE TABLE `orders` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`order_number` text NOT NULL,
	`customer_name` text NOT NULL,
	`customer_email` text NOT NULL,
	`customer_phone` text NOT NULL,
	`shipping_address` text NOT NULL,
	`shipping_city` text NOT NULL,
	`shipping_zip_code` text NOT NULL,
	`order_notes` text,
	`items` text NOT NULL,
	`total_amount` text NOT NULL,
	`total_items` integer NOT NULL,
	`payment_method` text DEFAULT 'Cash on Delivery' NOT NULL,
	`order_status` text DEFAULT 'pending' NOT NULL,
	`created_at` text NOT NULL,
	`updated_at` text NOT NULL
);
--> statement-breakpoint
CREATE UNIQUE INDEX `orders_order_number_unique` ON `orders` (`order_number`);