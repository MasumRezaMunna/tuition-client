import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { FaChalkboardTeacher, FaUserGraduate, FaCheckCircle } from "react-icons/fa";

const Home = () => {
    return (
        <div>
            <Helmet>
                <title>eTuitionBd | Home</title>
            </Helmet>

            <div className="hero min-h-[600px]" style={{backgroundImage: 'url(https://img.freepik.com/free-photo/education-day-arrangement-table-with-copy-space_23-2148721266.jpg)'}}>
                <div className="hero-overlay bg-opacity-60"></div>
                <div className="hero-content text-center text-neutral-content">
                    <div className="max-w-md">
                        <h1 className="mb-5 text-5xl font-bold">Find The Best Tutor</h1>
                        <p className="mb-5">Looking for a qualified tutor for your child? Or want to teach students? We connect students with the best tutors in the country.</p>
                        <div className="flex gap-4 justify-center">
                            <Link to="/tuitions" className="btn btn-primary">Find a Tutor</Link>
                            <Link to="/register" className="btn btn-outline btn-warning text-white">Become a Tutor</Link>
                        </div>
                    </div>
                </div>
            </div>

            <div className="max-w-screen-xl mx-auto my-16 px-4">
                <div className="stats shadow w-full text-center bg-base-100 border">
                    <div className="stat">
                        <div className="stat-figure text-primary text-3xl">
                            <FaChalkboardTeacher />
                        </div>
                        <div className="stat-title">Active Tutors</div>
                        <div className="stat-value text-primary">500+</div>
                        <div className="stat-desc">Qualified Teachers</div>
                    </div>
                    
                    <div className="stat">
                        <div className="stat-figure text-secondary text-3xl">
                            <FaUserGraduate />
                        </div>
                        <div className="stat-title">Happy Students</div>
                        <div className="stat-value text-secondary">1,200+</div>
                        <div className="stat-desc">Improved Grades</div>
                    </div>
                    
                    <div className="stat">
                        <div className="stat-figure text-accent text-3xl">
                            <FaCheckCircle />
                        </div>
                        <div className="stat-title">Success Rate</div>
                        <div className="stat-value">98%</div>
                        <div className="stat-desc">Satisfaction Guaranteed</div>
                    </div>
                </div>
            </div>

            <div className="bg-gray-100 py-16">
                <div className="max-w-screen-xl mx-auto px-4 text-center">
                    <h2 className="text-4xl font-bold mb-10">How It Works</h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {/* Step 1 */}
                        <div className="card bg-base-100 shadow-xl">
                            <div className="card-body items-center text-center">
                                <div className="badge badge-primary badge-lg p-4 mb-2">1</div>
                                <h2 className="card-title">Post a Requirement</h2>
                                <p>Students post their tuition needs detailing subject, class, and area.</p>
                            </div>
                        </div>
                        <div className="card bg-base-100 shadow-xl">
                            <div className="card-body items-center text-center">
                                <div className="badge badge-secondary badge-lg p-4 mb-2">2</div>
                                <h2 className="card-title">Get Matched</h2>
                                <p>Qualified tutors view your post and apply if they match your criteria.</p>
                            </div>
                        </div>
                        <div className="card bg-base-100 shadow-xl">
                            <div className="card-body items-center text-center">
                                <div className="badge badge-accent badge-lg p-4 mb-2">3</div>
                                <h2 className="card-title">Start Learning</h2>
                                <p>Select the best tutor, contact them, and start your classes immediately.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Home;