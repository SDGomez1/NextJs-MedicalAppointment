import { DoctorPage } from "@/components/DoctorPage";
import { LandingPage } from "@/components/LandingPage";
import { Footer } from "@/components/footer";
import { Navbar } from "@components/Navbar";
export default function IndexPage() {
	return (
		<>
			<Navbar />
			<LandingPage />
			<DoctorPage />
			<Footer />
		</>
	);
}
