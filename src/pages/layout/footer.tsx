import { Instagram, Twitter, Youtube } from "lucide-react";
import { Link } from "react-router-dom";

export function Footer() {
	return (
		<footer className="flex w-full flex-col gap-6 py-8 px-4 md:px-12 lg:px-24 border-t border-[#2B2B2B] bg-[#111]">
			<div className="grid grid-cols-1 sm:grid-cols-1 lg:grid-cols-3 gap-12">
				{/* Info */}
				<div className="flex flex-col gap-4">
					<h5 className="font-mono font-bold text-lg">Arkana</h5>
					<div className="flex flex-col gap-2 text-[#ccc] text-sm">
						<p>
							Arkana adalah dApp sederhana untuk menghubungkan wallet dan
							menampilkan koleksi NFT Anda. 🚀
						</p>
						<p>
							Ini baru permulaan—ke depan, kami berencana menghadirkan fitur
							yang lebih lengkap untuk para kolektor dan kreator.
						</p>
						<p>Ikuti perjalanan kami & gabung di komunitas:</p>
						<div className="flex items-center gap-3 text-[#ccc]">
							<Youtube className="cursor-pointer hover:text-white transition" />
							<Twitter className="cursor-pointer hover:text-white transition" />
							<Instagram className="cursor-pointer hover:text-white transition" />
						</div>
					</div>
				</div>

				{/* Explorer */}
				<div className="flex flex-col items-center gap-4">
					<h5 className="font-mono font-bold text-lg">Explorer</h5>
					<div className="flex flex-col gap-2 text-[#ccc] text-sm">
						<Link
							to={"/"}
							className="hover:text-white duration-300 transition-colors"
						>
							Home
						</Link>
						<Link
							to={"/marketplaces"}
							className="hover:text-white duration-300 transition-colors"
						>
							Marketplaces
						</Link>
						<Link
							to={"/rangkings"}
							className="hover:text-white duration-300 transition-colors"
						>
							Rankings
						</Link>
					</div>
				</div>

				{/* Join */}
				<div className="flex flex-col gap-4">
					<h5 className="font-mono font-bold text-lg">
						Join our weekly digest
					</h5>

					<div className="flex flex-col gap-2 text-[#ccc] text-sm">
						<p>
							Dapatkan update terbaru, sneak peek fitur baru, dan berita
							eksklusif seputar Arkana langsung ke inbox Anda.
						</p>

						<form
							onSubmit={(e) => {
								e.preventDefault();
								// TODO: handle subscription logic
							}}
							className="flex w-full max-w-md overflow-hidden rounded-xl bg-white shadow"
						>
							<label htmlFor="email" className="sr-only">
								Email address
							</label>
							<input
								id="email"
								type="email"
								required
								placeholder="Enter your email"
								className="flex-1 px-4 py-2 text-sm text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#A259FF]"
							/>
							<button
								type="submit"
								className="bg-[#A259FF] px-5 py-2 text-sm font-semibold text-white hover:bg-[#8c3de6] transition-colors"
							>
								Subscribe
							</button>
						</form>
					</div>
				</div>
			</div>

			<hr className="border-t w-full border-[#858584]" />
			<p className="text-[#CCCCCC] text-xs sm:text-sm">
				Ⓒ {new Date().getFullYear()} Arkana. Dibangun dengan ❤️ untuk para
				pecinta NFT. Semua hak cipta dilindungi.
			</p>
		</footer>
	);
}
