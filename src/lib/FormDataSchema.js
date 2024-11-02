import { z } from "zod";

export const CategorySchema = z.object({
  title: z.string().min(3, "please write a title"),
  description: z.string().optional(),
});

export const ProductSchema = z.object({
  title: z.string().min(3, "please write a title"),
  quantity: z.string().min(1, "please write a quantity"),
  price: z.string().min(1, "please write a price"),
  category: z.string().refine((val) => val !== "", "please select a category"),
});
