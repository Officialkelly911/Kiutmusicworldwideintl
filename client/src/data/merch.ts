/**
 * Kiut × Raba Bag merchandise highlights.
 * Single source of truth for the Home store banner and any other page
 * (e.g. Newsletter's "Featured Updates") that needs to reference a
 * merch item — never duplicate this list inline in a page component.
 */
export interface MerchItem {
  img: string;
  imgCls: string;
  badge: string;
  category: string;
  name: string;
  desc: string;
}

export const MERCH_HIGHLIGHTS: MerchItem[] = [
  { img: "/assets/images/merch-hoodie.webp",      imgCls: "object-cover object-top", badge: "Limited Edition", category: "Featured Drop",    name: "KiutRaba Signature Hoodie", desc: "The statement piece of the collection. Premium heavyweight fleece, embroidered KR crown logo — wear the sound." },
  { img: "/assets/images/merch-outfit-red.webp",  imgCls: "object-contain p-6",      badge: "Exclusive",       category: "Signature Series", name: "Hoodking",                  desc: "Bold color, editorial cut. The full Good Life look — head to toe KiutRaba energy." },
  { img: "/assets/images/merch-shirt.webp",       imgCls: "object-contain p-4",      badge: "Best Seller",     category: "Apparel",          name: "Classic Man",               desc: "Clean drop-shoulder silhouette. The essential studio wardrobe staple." },
  { img: "/assets/images/merch-collection.webp",  imgCls: "object-contain p-4",      badge: "Collection",      category: "Full Drop",        name: "Good Life Full Drop",       desc: "Every piece. One drop. The complete Good Life wardrobe — curated for the culture." },
  { img: "/assets/images/merch-cap-vintage.webp", imgCls: "object-contain p-8",      badge: "Apparel",         category: "New Arrival",      name: "EP Trucker Cap",            desc: "Structured trucker silhouette with EP embroidery. The everyday KiutRaba flex." },
  { img: "/assets/images/merch-cd.webp",          imgCls: "object-contain p-8",      badge: "Digital",         category: "Music",            name: "Good Life EP",              desc: "The debut EP. Stream or own it — Afrobeat fused with Caribbean energy, for the culture." },
  { img: "/assets/images/merch-baggy-jeans.webp", imgCls: "object-contain p-4",      badge: "Apparel",         category: "Bottoms",          name: "KR Baggy Jeans",            desc: "Wide-leg, culture-first. The KiutRaba street silhouette — from studio to the block." },
  { img: "/assets/images/merch-goodlife-ep.webp", imgCls: "object-cover",            badge: "Digital",         category: "Music",            name: "Goodlife Digital EP",       desc: "Own the Goodlife Digital EP — Afrobeat-forward sounds from the vault of KiutRaba." },
];
