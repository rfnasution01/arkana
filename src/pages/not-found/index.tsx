import { motion } from "framer-motion";
import { Link } from "react-router-dom";

export default function NotFoundPage() {
	return (
		<div className="flex flex-col items-center justify-center min-h-[70vh] gap-6 text-center px-4">
			{/* Animasi Rocket */}
			<motion.div
				initial={{ y: 50, opacity: 0 }}
				animate={{ y: 0, opacity: 1 }}
				transition={{ duration: 0.8, ease: "easeOut" }}
				className="mb-6 text-8xl"
			>
				🚀
			</motion.div>

			{/* Judul */}
			<motion.h1
				initial={{ opacity: 0 }}
				animate={{ opacity: 1 }}
				transition={{ delay: 0.3 }}
				className="text-3xl md:text-4xl font-bold text-white mb-4"
			>
				Coming Soon
			</motion.h1>

			{/* Deskripsi */}
			<p className="text-gray-300 max-w-md mb-6">
				Halaman ini sedang dalam pengembangan. Kami sedang menyiapkan sesuatu
				yang epik untuk para kolektor & kreator NFT. Nantikan update
				selanjutnya!
			</p>

			{/* Tombol Aksi */}
			<div className="flex gap-4">
				<Link
					to="/"
					className="px-5 py-2 rounded-2xl bg-purple-600 hover:bg-purple-700 text-white font-medium shadow-md"
				>
					Kembali ke Home
				</Link>
				<Link
					to="/subscribe"
					className="px-5 py-2 rounded-2xl bg-gray-800 hover:bg-gray-700 text-white font-medium shadow-md"
				>
					Dapatkan Update
				</Link>
			</div>
		</div>
	);
}
