import React, { useState, useEffect, useRef } from 'react'
import {
	ArrowRight,
	BrainCircuit,
	Calendar,
	ChevronDown,
	Clock,
	CloudCog,
	Code,
	Container,
	GitMerge,
	Mail,
	MapPin,
	Menu,
	Phone,
	Search,
	ShieldCheck,
	TestTube,
	X,
} from 'lucide-react'

// Mock Data
const blogPosts = [
	{
		id: 1,
		title: 'Leveraging AI for Efficient Code Reviews',
		date: 'July 15, 2024',
		excerpt:
			'Discover how modern AI tools can streamline your code review process, improve quality, and accelerate development cycles...',
		category: 'AI & Development',
		imageUrl: 'https://placehold.co/600x400/1E40AF/FFFFFF?text=AI+Code+Review',
	},
	{
		id: 2,
		title: 'The Ultimate Guide to a Modern DevOps Stack',
		date: 'July 10, 2024',
		excerpt:
			'A deep dive into the essential tools for building a robust and scalable DevOps pipeline, from Kubernetes to Terraform...',
		category: 'DevOps',
		imageUrl: 'https://placehold.co/600x400/1E40AF/FFFFFF?text=DevOps+Stack',
	},
	{
		id: 3,
		title: 'Why Unit and Integration Testing Matters',
		date: 'July 5, 2024',
		excerpt:
			'We explore the critical role of comprehensive testing in modern software development and how to implement it effectively.',
		category: 'Software Quality',
		imageUrl: 'https://placehold.co/600x400/1E40AF/FFFFFF?text=Software+Testing',
	},
]

const devopsSkills = {
	'Containerization & Orchestration': [
		'Kubernetes (K8s, k3s, AKS)',
		'OpenShift',
		'Docker',
		'Helm',
		'Rancher',
	],
	'CI/CD & Automation': [
		'Jenkins',
		'GitLab CI',
		'Azure DevOps',
		'Ansible',
		'Bash, PowerShell, Python, Groovy',
	],
	'Cloud Platforms': ['AWS', 'Azure (insb. AKS)', 'GCP (Grundkenntnisse)'],
	'Infrastructure as Code': [
		'Ansible',
		'ARM Templates',
		'Terraform (Grundkenntnisse)',
	],
	Observability: ['Prometheus', 'Grafana', 'CheckMK', 'ELK (Grundkenntnisse)'],
	DevSecOps: [
		'Secure Pipelines',
		'Vulnerability Scanning',
		'Secrets Management (Vault, Key Vault)',
		'IAM, Keycloak',
	],
}

// Custom hook for animations
const useInView = (options) => {
	const ref = useRef(null);
	const [isInView, setIsInView] = useState(false);

	useEffect(() => {
		const observer = new IntersectionObserver(([entry]) => {
			if (entry.isIntersecting) {
				setIsInView(true);
				observer.unobserve(entry.target);
			}
		}, options);

		if (ref.current) {
			observer.observe(ref.current);
		}

		return () => {
			if (ref.current) {
				observer.unobserve(ref.current);
			}
		};
	}, [ref, options]);

	return [ref, isInView];
};


// Components
const Logo = () => (
	<svg
		width="140"
		height="40"
		viewBox="0 0 140 40"
		fill="none"
		xmlns="http://www.w3.org/2000/svg"
	>
		<path
			d="M22.5 12.5C22.5 10.2909 20.7091 8.5 18.5 8.5H12.5C10.2909 8.5 8.5 10.2909 8.5 12.5V15.5C8.5 17.7091 10.2909 19.5 12.5 19.5H18.5C20.7091 19.5 22.5 21.2909 22.5 23.5V26.5C22.5 28.7091 20.7091 30.5 18.5 30.5H12.5C10.2909 30.5 8.5 28.7091 8.5 26.5"
			stroke="#3B82F6"
			strokeWidth="3"
		/>
		<text
			x="30"
			y="28"
			fontFamily="Roboto, sans-serif"
			fontSize="24"
			fontWeight="bold"
			fill="#2D3748"
		>
			avenix
		</text>
	</svg>
)

const Nav = ({ onLinkClick }) => {
	const [isOpen, setIsOpen] = useState(false)
	const links = ['Home', 'Services', 'DevOps', 'Blog', 'Contact']

	const handleLinkClick = (e, link) => {
		e.preventDefault()
		onLinkClick(link.toLowerCase())
		setIsOpen(false)
	}

	return (
		<nav className="bg-white/80 backdrop-blur-sm fixed w-full top-0 z-50 shadow-md">
			<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
				<div className="flex items-center justify-between h-20">
					<div className="flex-shrink-0">
						<a
							href="#home"
							onClick={(e) => handleLinkClick(e, 'home')}
							className="text-gray-800 text-2xl font-bold tracking-wider"
						>
							<Logo />
						</a>
					</div>
					<div className="hidden md:block">
						<div className="ml-10 flex items-baseline space-x-4">
							{links.map((link) => (
								<a
									key={link}
									href={`#${link.toLowerCase()}`}
									onClick={(e) => handleLinkClick(e, link)}
									className="text-gray-600 hover:bg-gray-200 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium transition-colors"
								>
									{link}
								</a>
							))}
						</div>
					</div>
					<div className="-mr-2 flex md:hidden">
						<button
							onClick={() => setIsOpen(!isOpen)}
							type="button"
							className="bg-gray-100 inline-flex items-center justify-center p-2 rounded-md text-gray-500 hover:text-gray-800 hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100 focus:ring-blue-500"
						>
							<span className="sr-only">Open main menu</span>
							{isOpen ? (
								<X className="block h-6 w-6" />
							) : (
								<Menu className="block h-6 w-6" />
							)}
						</button>
					</div>
				</div>
			</div>
			{isOpen && (
				<div className="md:hidden bg-white shadow-lg">
					<div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
						{links.map((link) => (
							<a
								key={link}
								href={`#${link.toLowerCase()}`}
								onClick={(e) => handleLinkClick(e, link)}
								className="text-gray-600 hover:bg-gray-200 hover:text-gray-900 block px-3 py-2 rounded-md text-base font-medium transition-colors"
							>
								{link}
							</a>
						))}
					</div>
				</div>
			)}
		</nav>
	)
}

const Hero = ({ onCTAClick }) => (
	<section id="home" className="pt-20 bg-white text-gray-800 relative overflow-hidden">
		<div className="absolute inset-0 z-0">
			<svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
				<defs>
					<pattern id="hero-pattern" width="100" height="100" patternUnits="userSpaceOnUse">
						<circle cx="50" cy="50" r="1" fill="#D1D5DB" />
					</pattern>
				</defs>
				<rect width="100%" height="100%" fill="url(#hero-pattern)" />
				<radialGradient id="grad-overlay" cx="50%" cy="50%" r="50%">
					<stop offset="0%" style={{stopColor: 'rgba(255,255,255,1)'}} />
					<stop offset="100%" style={{stopColor: 'rgba(255,255,255,0)'}} />
				</radialGradient>
				<rect width="100%" height="100%" fill="url(#grad-overlay)" />
			</svg>
		</div>
		<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 md:py-32 text-center relative z-10">
			<h1 className="text-4xl md:text-6xl font-extrabold tracking-tight mb-4">
				<span className="block">Expert IT Support &</span>
				<span className="block text-blue-600">AI-Powered Development</span>
			</h1>
			<p className="mt-4 max-w-2xl mx-auto text-lg md:text-xl text-gray-600">
				Your trusted partner for modern IT solutions in Bulgaria and across the
				EU. From requirements analysis to advanced DevOps, we deliver quality
				and efficiency.
			</p>
			<div className="mt-8 flex justify-center">
				<button
					onClick={() => onCTAClick('contact')}
					className="inline-flex items-center justify-center px-8 py-4 border border-transparent text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 transition-transform transform hover:scale-105 shadow-lg hover:shadow-xl"
				>
					Book a Free Consultation
					<ArrowRight className="ml-2 -mr-1 h-5 w-5" />
				</button>
			</div>
		</div>
	</section>
)

const AnimatedSection = ({ children }) => {
	const [ref, isInView] = useInView({ threshold: 0.1 });
	return (
		<div ref={ref} className={`transition-opacity duration-1000 ease-in ${isInView ? 'opacity-100' : 'opacity-0'}`}>
			{children}
		</div>
	);
};

const Services = () => {
	const services = [
		{
			icon: <Search className="h-10 w-10 text-blue-600" />,
			title: 'Requirements Analysis',
			description:
				'In-depth analysis to ensure your software meets business needs perfectly.',
		},
		{
			icon: <Code className="h-10 w-10 text-blue-600" />,
			title: 'Software Development',
			description:
				'Custom software solutions built with modern technologies and best practices.',
		},
		{
			icon: <TestTube className="h-10 w-10 text-blue-600" />,
			title: 'Unit & Integration Testing',
			description:
				'Enhancing software quality and reliability with comprehensive testing strategies.',
		},
		{
			icon: <BrainCircuit className="h-10 w-10 text-blue-600" />,
			title: 'AI-Powered Efficiency',
			description:
				'Utilizing modern AI tools to accelerate development and improve code quality.',
		},
		{
			icon: <CloudCog className="h-10 w-10 text-blue-600" />,
			title: 'DevOps Services',
			description:
				'Building and maintaining modern DevOps stacks for seamless workflows.',
		},
		{
			icon: <GitMerge className="h-10 w-10 text-blue-600" />,
			title: 'Code Reviews',
			description:
				'Expert code reviews to ensure maintainability, security, and performance.',
		},
	]

	return (
		<section id="services" className="py-20 bg-gray-100">
			<AnimatedSection>
				<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
					<div className="text-center">
						<h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
							Our Core Services
						</h2>
						<p className="mt-4 text-lg text-gray-600">
							Driving innovation and quality in every project.
						</p>
					</div>
					<div className="mt-12 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
						{services.map((service, index) => (
							<div
								key={index}
								className="bg-white rounded-lg shadow-lg p-8 flex flex-col items-center text-center transform hover:-translate-y-2 transition-transform duration-300"
							>
								<div className="flex-shrink-0 mb-4">{service.icon}</div>
								<h3 className="text-xl font-bold text-gray-900">
									{service.title}
								</h3>
								<p className="mt-2 text-base text-gray-600">
									{service.description}
								</p>
							</div>
						))}
					</div>
				</div>
			</AnimatedSection>
		</section>
	)
}

const DevOpsStack = () => (
	<section id="devops" className="py-20 bg-white">
		<AnimatedSection>
			<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
				<div className="text-center mb-12">
					<h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
						Our DevOps Expertise
					</h2>
					<p className="mt-4 text-lg text-gray-600">
						The tools and technologies we master to empower your business.
					</p>
				</div>
				<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
					{Object.entries(devopsSkills).map(([category, skills]) => (
						<div
							key={category}
							className="bg-gray-50 border border-gray-200 p-6 rounded-lg shadow-sm"
						>
							<h3 className="text-xl font-semibold text-blue-600 mb-4">
								{category}
							</h3>
							<ul className="space-y-2">
								{skills.map((skill) => (
									<li key={skill} className="flex items-center text-gray-700">
										<svg
											className="h-4 w-4 mr-2 text-green-500"
											fill="none"
											viewBox="0 0 24 24"
											stroke="currentColor"
										>
											<path
												strokeLinecap="round"
												strokeLinejoin="round"
												strokeWidth="2"
												d="M5 13l4 4L19 7"
											/>
										</svg>
										{skill}
									</li>
								))}
							</ul>
						</div>
					))}
				</div>
			</div>
		</AnimatedSection>
	</section>
)

const Blog = () => (
	<section id="blog" className="py-20 bg-gray-100">
		<AnimatedSection>
			<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
				<div className="text-center mb-12">
					<h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
						From Our Blog
					</h2>
					<p className="mt-4 text-lg text-gray-600">
						Insights on technology, development, and industry trends.
					</p>
				</div>
				<div className="grid gap-8 lg:grid-cols-3">
					{blogPosts.map((post) => (
						<div
							key={post.id}
							className="bg-white rounded-lg shadow-lg overflow-hidden flex flex-col transform hover:-translate-y-2 transition-transform duration-300"
						>
							<img className="h-48 w-full object-cover" src={post.imageUrl} alt={post.title} />
							<div className="p-6 flex-grow">
								<p className="text-sm text-blue-600 font-semibold">
									{post.category}
								</p>
								<h3 className="mt-2 text-xl font-semibold text-gray-900">
									{post.title}
								</h3>
								<p className="mt-3 text-base text-gray-600">{post.excerpt}</p>
							</div>
							<div className="p-6 bg-gray-50 mt-auto">
								<div className="flex items-center justify-between">
									<p className="text-sm text-gray-500">{post.date}</p>
									<a href="#" className="font-medium text-blue-600 hover:text-blue-500">
										Read more &rarr;
									</a>
								</div>
							</div>
						</div>
					))}
				</div>
			</div>
		</AnimatedSection>
	</section>
)

const ConsultationCalendar = () => {
	const [currentDate, setCurrentDate] = useState(new Date())
	const [selectedDate, setSelectedDate] = useState(new Date())
	const [selectedTime, setSelectedTime] = useState(null)

	const availableTimes = ['09:00', '10:00', '11:00', '14:00', '15:00', '16:00']

	const handleDateClick = (day) => {
		const newSelectedDate = new Date(
			currentDate.getFullYear(),
			currentDate.getMonth(),
			day,
		)
		setSelectedDate(newSelectedDate)
		setSelectedTime(null)
	}

	const changeMonth = (offset) => {
		setCurrentDate((prevDate) => {
			const newDate = new Date(prevDate)
			newDate.setMonth(newDate.getMonth() + offset)
			return newDate
		})
	}

	const handleConfirmAppointment = () => {
		if (!selectedDate || !selectedTime) {
			alert('Please select a date and time.');
			return;
		}

		const subject = 'Consultation Appointment Request';
		const body = `Hello Savenix team,

I would like to request a consultation on ${selectedDate.toDateString()} at ${selectedTime}.

[Please add any specific topics you'd like to discuss here]

Thank you,`;

		window.location.href = `mailto:contact@savenix.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
	};


	const renderCalendar = () => {
		const year = currentDate.getFullYear()
		const month = currentDate.getMonth()
		const firstDayOfMonth = new Date(year, month, 1).getDay()
		const daysInMonth = new Date(year, month + 1, 0).getDate()

		const blanks = Array(firstDayOfMonth).fill(null)
		const days = Array.from({ length: daysInMonth }, (_, i) => i + 1)

		return (
			<>
				{blanks.map((_, index) => (
					<div key={`blank-${index}`}></div>
				))}
				{days.map((day) => {
					const isSelected =
						selectedDate &&
						day === selectedDate.getDate() &&
						month === selectedDate.getMonth() &&
						year === selectedDate.getFullYear()

					return (
						<button
							key={day}
							onClick={() => handleDateClick(day)}
							className={`w-8 h-8 flex items-center justify-center rounded-full transition-colors ${
								isSelected
									? 'bg-blue-600 text-white shadow-md'
									: 'hover:bg-blue-100'
							}`}
						>
							{day}
						</button>
					)
				})}
			</>
		)
	}

	return (
		<div className="bg-white p-8 rounded-lg shadow-lg border border-gray-200">
			<h3 className="text-2xl font-bold text-gray-900 mb-6 text-center">
				Schedule a Consultation
			</h3>
			<div className="grid md:grid-cols-2 gap-8">
				<div>
					<h4 className="text-lg font-semibold text-blue-600 mb-4">
						1. Select a Date
					</h4>
					<div className="bg-gray-50 p-4 rounded-lg text-gray-800 border">
						<div className="flex justify-between items-center mb-4">
							<button
								onClick={() => changeMonth(-1)}
								className="p-2 rounded-full hover:bg-gray-200"
							>
								&lt;
							</button>
							<span className="font-bold text-lg">
                {currentDate.toLocaleString('default', {
					month: 'long',
					year: 'numeric',
				})}
              </span>
							<button
								onClick={() => changeMonth(1)}
								className="p-2 rounded-full hover:bg-gray-200"
							>
								&gt;
							</button>
						</div>
						<div className="grid grid-cols-7 gap-2 justify-items-center text-center text-sm">
							{['S', 'M', 'T', 'W', 'T', 'F', 'S'].map((d) => (
								<div key={d} className="font-bold text-gray-500">
									{d}
								</div>
							))}
							{renderCalendar()}
						</div>
					</div>
				</div>
				<div>
					<h4 className="text-lg font-semibold text-blue-600 mb-4">
						2. Select a Time
					</h4>
					<div className="grid grid-cols-2 gap-4">
						{availableTimes.map((time) => (
							<button
								key={time}
								onClick={() => setSelectedTime(time)}
								className={`p-3 rounded-lg text-center font-medium transition-colors border ${
									selectedTime === time
										? 'bg-blue-600 text-white border-blue-600 shadow-md'
										: 'bg-white text-gray-700 hover:bg-blue-100 hover:border-blue-300 border-gray-300'
								}`}
							>
								{time}
							</button>
						))}
					</div>
				</div>
			</div>
			{selectedTime && selectedDate && (
				<div className="mt-8 text-center">
					<p className="text-gray-600 mb-4">
						You've selected:{' '}
						<span className="font-semibold text-gray-800">
              {selectedDate.toDateString()} at {selectedTime}
            </span>
					</p>
					<button
						onClick={handleConfirmAppointment}
						className="w-full md:w-auto bg-green-500 hover:bg-green-600 text-white font-bold py-3 px-6 rounded-lg transition-colors shadow-lg hover:shadow-xl">
						Confirm Appointment
					</button>
				</div>
			)}
		</div>
	)
}

const Contact = () => (
	<section id="contact" className="py-20 bg-gray-100">
		<AnimatedSection>
			<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
				<div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
					<div className="text-gray-800">
						<h2 className="text-3xl font-extrabold sm:text-4xl">Get in Touch</h2>
						<p className="mt-4 text-lg text-gray-600">
							Ready to start your next project or need expert support? Reach out
							to us. We serve clients in Bulgaria and the entire EU.
						</p>
						<div className="mt-8 space-y-4">
							<div className="flex items-start">
								<MapPin className="flex-shrink-0 h-6 w-6 text-blue-600" />
								<div className="ml-4">
									<h3 className="text-lg font-medium">Our Office</h3>
									<p className="text-gray-600">Sofia, Bulgaria</p>
								</div>
							</div>
							<div className="flex items-start">
								<Mail className="flex-shrink-0 h-6 w-6 text-blue-600" />
								<div className="ml-4">
									<h3 className="text-lg font-medium">Email</h3>
									<a
										href="mailto:contact@savenix.com"
										className="text-gray-600 hover:text-blue-600"
									>
										contact@savenix.com
									</a>
								</div>
							</div>
							<div className="flex items-start">
								<Phone className="flex-shrink-0 h-6 w-6 text-blue-600" />
								<div className="ml-4">
									<h3 className="text-lg font-medium">Phone</h3>
									<a
										href="tel:+35912345678"
										className="text-gray-600 hover:text-blue-600"
									>
										+359 123 456 78
									</a>
								</div>
							</div>
						</div>
					</div>
					<ConsultationCalendar />
				</div>
			</div>
		</AnimatedSection>
	</section>
)

const Footer = () => (
	<footer className="bg-white border-t border-gray-200">
		<div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8 text-center text-gray-500">
			<p>&copy; {new Date().getFullYear()} savenix.com. All rights reserved.</p>
			<p className="text-sm mt-2">
				Your Partner in IT Innovation | Sofia, Bulgaria
			</p>
		</div>
	</footer>
)

export default function App() {
	const scrollToSection = (sectionId) => {
		const section = document.getElementById(sectionId)
		if (section) {
			section.scrollIntoView({ behavior: 'smooth' })
		}
	}

	return (
		<>
			<style>
				{`
                    @import url('https://fonts.googleapis.com/css2?family=Roboto:wght@400;500;700;900&display=swap');
                    body { font-family: 'Roboto', sans-serif; }
                `}
			</style>
			<div className="bg-white">
				<Nav onLinkClick={scrollToSection} />
				<main>
					<Hero onCTAClick={scrollToSection} />
					<Services />
					<DevOpsStack />
					<Blog />
					<Contact />
				</main>
				<Footer />
			</div>
		</>
	)
}
