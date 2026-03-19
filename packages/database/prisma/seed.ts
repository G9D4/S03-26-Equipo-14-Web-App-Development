import path from "path";
import { fileURLToPath } from "url";
import { PrismaClient } from "../app/generated/prisma";
import { uploadImage } from "../lib/services/cloudinary";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const appRoot = path.resolve(__dirname, "..");
const prisma = new PrismaClient();

// ===== HELPERS =====
function generateSKU(categoryName: string, brandName: string): string {
  const catPrefix = categoryName.slice(0, 3).toUpperCase();
  const brandPrefix = brandName.slice(0, 3).toUpperCase();
  const timestamp = Date.now().toString(36).toUpperCase();
  return `${catPrefix}-${brandPrefix}-${timestamp}`;
}

function generateSlug(name: string): string {
  return name
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

function generateTags(
  name: string,
  description: string,
  categoryName: string,
  brandName: string
): string[] {
  const words = `${name} ${description} ${categoryName} ${brandName}`
    .toLowerCase()
    .split(/\s+/)
    .filter((word) => word.length > 3);

  return [...new Set(words)].slice(0, 8);
}

// ===== TIPOS =====
interface Brand {
  name: string;
  logo: string;
}

interface Category {
  name: string;
  imageUrl: string;
}

interface Product {
  name: string;
  description: string;
  brandName: string;
  categoryName: string;
  price: number;
  images: string[];
  stock?: number;
}

// ===== DATA =====
const initBrands: Brand[] = [
  {
    name: "INTEL",
    logo: path.join(appRoot, "public/seedImages/brands/Intel.png"),
  },
  {
    name: "AMD",
    logo: path.join(appRoot, "public/seedImages/brands/AMD.svg"),
  },
  {
    name: "Gigabyte",
    logo: path.join(appRoot, "public/seedImages/brands/gigabyte.png"),
  },
  { name: "NVIDIA", logo: "" },
  { name: "ASUS", logo: "" },
  { name: "MSI", logo: "" },
  { name: "Corsair", logo: "" },
  { name: "Samsung", logo: "" },
  { name: "Western Digital", logo: "" },
  { name: "Seagate", logo: "" },
  { name: "Kingston", logo: "" },
  { name: "Logitech", logo: "" },
  { name: "NZXT", logo: "" },
  { name: "Lian Li", logo: "" },
  { name: "Fractal Design", logo: "" },
  { name: "Cooler Master", logo: "" },
  { name: "be quiet!", logo: "" },
  { name: "Phanteks", logo: "" },
  { name: "Thermaltake", logo: "" },
  { name: "EVGA", logo: "" },
  { name: "Seasonic", logo: "" },
  { name: "G.Skill", logo: "" },
  { name: "Crucial", logo: "" },
  { name: "Team Group", logo: "" },
  { name: "Patriot", logo: "" },
  { name: "ADATA", logo: "" },
];

const initCategories: Category[] = [
  {
    name: "CPU",
    imageUrl: path.join(appRoot, "public/seedImages/categories/cpu.svg"),
  },
  {
    name: "GPU",
    imageUrl: path.join(appRoot, "public/seedImages/categories/gpu.svg"),
  },
  {
    name: "Motherboard",
    imageUrl: path.join(
      appRoot,
      "public/seedImages/categories/motherboard.svg"
    ),
  },
  {
    name: "Case",
    imageUrl: path.join(appRoot, "public/seedImages/categories/case.svg"),
  },
  {
    name: "Power Supply",
    imageUrl: path.join(
      appRoot,
      "public/seedImages/categories/power-supply.svg"
    ),
  },
  {
    name: "Ram",
    imageUrl: path.join(appRoot, "public/seedImages/categories/ram.svg"),
  },
];

const initProducts: Product[] = [
  {
    name: "Ryzen 7 7800X3D",
    description:
      "AMD Ryzen 7 7800X3D processor with 3D V-Cache technology for ultimate gaming performance",
    brandName: "AMD",
    categoryName: "CPU",
    price: 449.99,
    stock: 15,
    images: [
      path.join(appRoot, "public/seedImages/products/7800x3d.webp"),
      path.join(appRoot, "public/seedImages/products/7800x3d_2.webp"),
    ],
  },
  {
    name: "RX 6600",
    description: "AMD Radeon RX 6600 graphics card with 8GB GDDR6 memory",
    brandName: "AMD",
    categoryName: "GPU",
    price: 280.99,
    stock: 20,
    images: [
      path.join(appRoot, "public/seedImages/products/rx6600.avif"),
      path.join(appRoot, "public/seedImages/products/rx6600_2.jpg"),
    ],
  },
  {
    name: "Intel Core i5-12400",
    description:
      "Intel Core i5-12400 6-core processor for gaming and productivity",
    brandName: "INTEL",
    categoryName: "CPU",
    price: 299.99,
    stock: 25,
    images: [
      path.join(appRoot, "public/seedImages/products/12400.jpg"),
      path.join(appRoot, "public/seedImages/products/12400_2.jpeg"),
    ],
  },
  {
    name: "Intel Core i7-14600K",
    description:
      "Intel Core i7-14600K unlocked processor with hybrid architecture",
    brandName: "INTEL",
    categoryName: "CPU",
    price: 449.99,
    stock: 12,
    images: [
      path.join(appRoot, "public/seedImages/products/14600.jpg"),
      path.join(appRoot, "public/seedImages/products/14600_2.webp"),
    ],
  },
  {
    name: "Gigabyte H410M H V2",
    description: "Gigabyte H410M H V2 micro-ATX motherboard for Intel 10th gen",
    brandName: "Gigabyte",
    categoryName: "Motherboard",
    price: 175.99,
    stock: 18,
    images: [
      path.join(appRoot, "public/seedImages/products/h410hv2.jpg"),
      path.join(appRoot, "public/seedImages/products/h410mhv2_2.webp"),
    ],
  },
  {
    name: "Gigabyte B550M K",
    description: "Gigabyte B550M K micro-ATX motherboard with PCIe 4.0 support",
    brandName: "Gigabyte",
    categoryName: "Motherboard",
    price: 225.99,
    stock: 16,
    images: [
      path.join(appRoot, "public/seedImages/products/b550mk.png"),
      path.join(appRoot, "public/seedImages/products/b550mk_2.png"),
    ],
  },
  // Productos sin imágenes
  {
    name: "AMD Ryzen 5 7600X",
    description: "AMD Ryzen 5 7600X 6-core processor with Zen 4 architecture",
    brandName: "AMD",
    categoryName: "CPU",
    price: 299.99,
    stock: 30,
    images: [],
  },
  {
    name: "Intel Core i9-13900K",
    description: "Intel Core i9-13900K flagship 24-core processor",
    brandName: "INTEL",
    categoryName: "CPU",
    price: 589.99,
    stock: 8,
    images: [],
  },
  {
    name: "GeForce RTX 4060",
    description: "NVIDIA GeForce RTX 4060 graphics card with DLSS 3 technology",
    brandName: "NVIDIA",
    categoryName: "GPU",
    price: 299.99,
    stock: 25,
    images: [],
  },
  {
    name: "GeForce RTX 4090",
    description:
      "NVIDIA GeForce RTX 4090 flagship graphics card with 24GB GDDR6X",
    brandName: "NVIDIA",
    categoryName: "GPU",
    price: 1599.99,
    stock: 5,
    images: [],
  },
  {
    name: "ASUS ROG Strix B650E-E",
    description: "ASUS ROG Strix B650E-E gaming motherboard with WiFi 6E",
    brandName: "ASUS",
    categoryName: "Motherboard",
    price: 329.99,
    stock: 10,
    images: [],
  },
  {
    name: "NZXT H5 Flow",
    description: "NZXT H5 Flow mid-tower case with optimized airflow",
    brandName: "NZXT",
    categoryName: "Case",
    price: 89.99,
    stock: 20,
    images: [],
  },
  {
    name: "Corsair 4000D Airflow",
    description: "Corsair 4000D Airflow mid-tower case with tempered glass",
    brandName: "Corsair",
    categoryName: "Case",
    price: 94.99,
    stock: 22,
    images: [],
  },
  {
    name: "Corsair RM750x",
    description: "Corsair RM750x 750W 80+ Gold fully modular power supply",
    brandName: "Corsair",
    categoryName: "Power Supply",
    price: 119.99,
    stock: 15,
    images: [],
  },
  {
    name: "Seasonic Focus GX-850",
    description: "Seasonic Focus GX-850 850W 80+ Gold modular power supply",
    brandName: "Seasonic",
    categoryName: "Power Supply",
    price: 149.99,
    stock: 12,
    images: [],
  },
  {
    name: "Corsair Vengeance LPX 16GB",
    description: "Corsair Vengeance LPX 16GB (2x8GB) DDR4-3200 RAM kit",
    brandName: "Corsair",
    categoryName: "Ram",
    price: 54.99,
    stock: 40,
    images: [],
  },
  {
    name: "Kingston Fury Beast 32GB",
    description: "Kingston Fury Beast 32GB (2x16GB) DDR4-3600 RAM kit",
    brandName: "Kingston",
    categoryName: "Ram",
    price: 89.99,
    stock: 35,
    images: [],
  },
  {
    name: "G.Skill Ripjaws V 16GB",
    description:
      "G.Skill Ripjaws V 16GB (2x8GB) DDR4-3600 high-performance RAM",
    brandName: "G.Skill",
    categoryName: "Ram",
    price: 59.99,
    stock: 38,
    images: [],
  },
];

// ===== SEED MAIN FUNCTION =====
async function main() {
  console.log("🗑️  Limpiando base de datos...");

  /*  await prisma.product.deleteMany({});
  await prisma.brand.deleteMany({});
  await prisma.category.deleteMany({}); */

  console.log("✅ Base de datos limpia\n");

  // Crear Brands
  console.log("🏷️  Creando marcas...");
  const brandPromises = initBrands.map(async (brand) => {
    const logoUrl = brand.logo ? await uploadImage(brand.logo) : "";
    return prisma.brand.create({
      data: {
        name: brand.name,
        logo: logoUrl || null,
      },
    });
  });

  const createdBrands = await Promise.all(brandPromises);
  console.log(`✅ ${createdBrands.length} marcas creadas\n`);

  // Crear Categories
  console.log("📁 Creando categorías...");
  const categoryPromises = initCategories.map(async (category) => {
    const imageUrl = await uploadImage(category.imageUrl);
    return prisma.category.create({
      data: {
        name: category.name,
        imageUrl: imageUrl,
      },
    });
  });

  const createdCategories = await Promise.all(categoryPromises);
  console.log(`✅ ${createdCategories.length} categorías creadas\n`);

  // Crear Products
  console.log("📦 Creando productos...");
  let productCount = 0;

  for (const product of initProducts) {
    const brand = createdBrands.find((b) => b.name === product.brandName);
    const category = createdCategories.find(
      (c) => c.name === product.categoryName
    );

    if (!brand || !category) {
      console.warn(
        `⚠️  Saltando producto "${product.name}" - marca o categoría no encontrada`
      );
      continue;
    }

    // Subir imágenes
    const uploadedImageUrls = await Promise.all(
      product.images.map((imagePath) =>
        imagePath ? uploadImage(imagePath) : Promise.resolve("")
      )
    );

    // Filtrar URLs vacías
    const validImages = uploadedImageUrls.filter((url) => url !== "");

    // Generar campos automáticos
    const sku = generateSKU(category.name, brand.name);
    const slug = generateSlug(product.name);
    const tags = generateTags(
      product.name,
      product.description,
      category.name,
      brand.name
    );

    await prisma.product.create({
      data: {
        name: product.name,
        description: product.description,
        price: product.price,
        stock: product.stock || 10,
        sku,
        slug,
        tags,
        brandId: brand.id,
        categoryId: category.id,
        images: validImages,
        isActive: true,
        views: 0,
      },
    });

    productCount++;
    console.log(`  ✓ Producto "${product.name}" creado`);
  }

  console.log(`\n✅ ${productCount} productos creados`);
  console.log("\n🎉 Seed completado exitosamente!");
}

main()
  .catch((e) => {
    console.error("❌ Error en seed:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
