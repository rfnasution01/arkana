/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react";
import { DialogCustom } from "../dialog/DialogCustom";
import Select from "react-select";
import { Button } from "@/components/ui/button";
import { Calendar } from "lucide-react";

interface Props {
	value?: string;
	placeholder?: string;
	isDisabled?: boolean;
	onSave: (value: string) => void;
}
const DateInput = (props: Props) => {
	const { placeholder = "Pilih Tanggal", value, onSave, isDisabled } = props;
	const [open, setOpen] = useState(false);
	const [day, setDay] = useState<{
		label: string;
		value: string;
	}>();
	const [month, setMonth] = useState<{
		label: string;
		value: string;
	}>();
	const [year, setYear] = useState<{
		label: string;
		value: string;
	}>();

	const days: any = Array.from({ length: 31 }, (_, i) => `${i + 1}`).map(
		(row, index) => {
			return {
				label: row,
				value: (index + 1).toString().padStart(2, "0"),
			};
		}
	);
	const months: any = [
		"Januari",
		"Februari",
		"Maret",
		"April",
		"Mei",
		"Juni",
		"Juli",
		"Agustus",
		"September",
		"Oktober",
		"November",
		"Desember",
	].map((item, index) => {
		return {
			value: (index + 1).toString().padStart(2, "0"),
			label: item,
		};
	});
	const years: any = Array.from({ length: 100 }, (_, i) => `${2025 - i}`).map(
		(item) => {
			return {
				value: item,
				label: item,
			};
		}
	);
	useEffect(() => {
		if (value) {
			const date = value.split("-");

			setMonth(months.find((row: any) => row.value === date[1]) ?? null);
			setYear(years.find((row: any) => row.value === date[0]) ?? null);
			setDay(days.find((row: any) => row.value === date[2]) ?? null);
		}
	}, [value]);

	return (
		<>
			<div className="w-full">
				<div
					onClick={() => {
						if (!isDisabled) {
							setOpen(true);
						}
					}}
					className={` ${
						isDisabled ? "grayscale cursor-not-allowed" : ""
					} border flex gap-4 justify-between items-center border-gray-300 h-[40px] rounded-lg px-4 py-2`}
				>
					<div className={value ? "" : "text-gray-400"}>
						{value ?? placeholder}
					</div>
					<Calendar className="text-sm w-4" />
				</div>
			</div>
			<DialogCustom
				open={open}
				setOpen={setOpen}
				classname="max-w-xl"
				title={<p className="text-2xl font-bold">Edit Tanggal Lahir Anda</p>}
				description="Tanggal Lahir Digunakan untuk akun dan profil di Pusat Akun ini. Setiap perubahan yang Anda buat akan diterapkan disemuanya"
			>
				<div className="grid grid-cols-1 mb-4 lg:grid-cols-3 gap-4 mt-4">
					<Select
						options={days}
						value={day}
						placeholder={placeholder}
						onChange={(option: any) => {
							setDay(option);
						}}
						classNamePrefix="react-select"
						className={`min-h-[40px] `}
					/>
					<Select
						options={months}
						value={month}
						placeholder={placeholder}
						onChange={(option: any) => {
							setMonth(option);
						}}
						classNamePrefix="react-select"
						className={`min-h-[40px] `}
					/>
					<Select
						options={years}
						value={year}
						placeholder={placeholder}
						onChange={(option: any) => {
							setYear(option);
						}}
						classNamePrefix="react-select"
						className={`min-h-[40px]`}
					/>
				</div>
				<Button
					disabled={!year || !month || !day}
					onClick={(e) => {
						e.preventDefault();

						// format jadi 2 digit

						onSave(`${year?.value}-${month?.value}-${day?.value}`);
						setOpen(false);
					}}
					className="bg-primary w-full text-white"
				>
					Simpan
				</Button>
			</DialogCustom>
		</>
	);
};

export default DateInput;
