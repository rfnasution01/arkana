/* eslint-disable no-useless-escape */
export function convertToSlug(text = "") {
	return text
		?.toLowerCase()
		?.replace(/\s+/g, "-") // Ganti spasi dengan tanda strip
		?.replace(/[^\w\-]+/g, "") // Hapus karakter non-word dan non-stripped
		?.replace(/\-\-+/g, "-") // Ganti dua strip atau lebih dengan satu strip
		?.replace(/^-+/, "") // Hapus strip dari awal teks
		?.replace(/-+$/, ""); // Hapus strip dari akhir teks
}

export function convertSlugToText(slug = "") {
	// Ubah strip menjadi spasi dan ubah teks menjadi huruf kapital setiap kata
	const text = slug
		?.replace(/-/g, " ")
		?.replace(/\b\w/g, (char) => char.toUpperCase());

	return text;
}

export function truncateAddress(address: string, length = 4) {
	if (!address) return "";
	const start = address.slice(0, length + 2); // +2 untuk '0x'
	const end = address.slice(-length);
	return `${start}...${end}`;
}
