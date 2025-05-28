"use client"
import { useState } from 'react'
import { supabase } from '@/lib/supabaseClient'
import Image from 'next/image'

export default function Home() {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    area: '',
    custom_area: '',
    has_license: null
  })
  const [submitted, setSubmitted] = useState(false)
  const [showLicenseQ, setShowLicenseQ] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const serviceableAreas = ['HSR Layout', 'Koramangala', 'Electronic City']

  const handleChange = (e) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }))

    if (e.target.name === 'area') {
      if (serviceableAreas.includes(e.target.value)) {
        setShowLicenseQ(true)
      } else {
        setShowLicenseQ(false)
        setFormData(prev => ({ ...prev, has_license: null }))
      }
    }
  }

  const validateForm = () => {
    if (!formData.name.trim()) {
      alert('Please enter your name')
      return false
    }
    if (!formData.phone.trim()) {
      alert('Please enter your phone number')
      return false
    }
    if (!formData.email.trim()) {
      alert('Please enter your email')
      return false
    }
    if (!formData.area) {
      alert('Please select your area')
      return false
    }
    if (formData.area === 'Other' && !formData.custom_area.trim()) {
      alert('Please enter your custom area')
      return false
    }
    return true
  }

  const handleSubmit = async () => {
    if (!validateForm()) return

    setIsLoading(true)
    
    try {
      const cleanData = {
        name: formData.name.trim(),
        phone: formData.phone.trim(),
        email: formData.email.trim(),
        area: formData.area,
        custom_area: formData.area === 'Other' ? formData.custom_area.trim() : null,
        has_license: formData.has_license
      }

      console.log('Submitting data:', cleanData)

      const { data, error } = await supabase
        .from('users')
        .insert([cleanData])
        .select()

      if (error) {
        console.error('Supabase error:', error)
        alert(`Failed to submit: ${error.message}`)
      } else {
        console.log('Success:', data)
        setSubmitted(true)
      }
    } catch (err) {
      console.error('Network error:', err)
      alert('Network error. Please check your connection and try again.')
    } finally {
      setIsLoading(false)
    }
  }

  if (submitted) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-white to-green-100 flex items-center justify-center px-1">
        <div className="w-full max-w-sm lg:max-w-lg mx-auto lg:border lg:border-gray-200 lg:shadow-2xl lg:rounded-3xl lg:bg-white/90 lg:backdrop-blur-md lg:p-6">
          <div className="min-h-screen lg:min-h-0 relative overflow-hidden bg-gradient-to-br from-emerald-50 via-white to-green-100 lg:bg-transparent lg:rounded-2xl">
            {/* Animated Background Elements */}
            <div className="absolute inset-0">
              <div className="absolute top-20 left-4 w-24 h-24 bg-green-200/30 rounded-full animate-float"></div>
              <div className="absolute top-40 right-4 w-20 h-20 bg-emerald-300/20 rounded-full animate-float-delayed"></div>
              <div className="absolute bottom-32 left-1/4 w-32 h-32 bg-green-100/40 rounded-full animate-float-slow"></div>
              <div className="absolute bottom-20 right-4 w-24 h-24 bg-emerald-200/25 rounded-full animate-float"></div>
              
              <div className="absolute bottom-0 left-0 w-full">
                <svg className="w-full h-24" viewBox="0 0 1200 120" preserveAspectRatio="none">
                  <path d="M0,0V46.29c47.79,22.2,103.59,32.17,158,28,70.36-5.37,136.33-33.31,206.8-37.5C438.64,32.43,512.34,53.67,583,72.05c69.27,18,138.3,24.88,209.4,13.08,36.15-6,69.85-17.84,104.45-29.34C989.49,25,1113-14.29,1200,52.47V0Z" 
                        fill="#10b981" 
                        className="animate-wave opacity-30"></path>
                </svg>
              </div>
            </div>

            <div className="relative z-10 flex flex-col justify-center items-center min-h-screen lg:min-h-96 px-1">
              <div className="text-center max-w-sm lg:max-w-md">
                <div className="mb-8 animate-bounce-gentle">
                  <div className="w-24 h-24 bg-gradient-to-r from-green-500 to-emerald-600 rounded-full flex items-center justify-center mx-auto shadow-lg">
                    <svg className="w-12 h-12 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                </div>
                <h1 className="text-4xl font-bold text-green-800 mb-4 animate-fade-in">Thank You!</h1>
                <p className="text-lg text-green-700 animate-fade-in-delayed">Thank you for trusting us to be your driving buddy, we will get in touch with you soon to start your driving journey.</p>
              </div>
            </div>

            <footer className="absolute bottom-4 left-0 right-0 text-center text-sm text-gray-500 z-10 lg:relative lg:bottom-0 lg:mt-8">
              <a href="#" className="hover:text-green-600 transition-colors">Terms & Conditions</a> | 
              <a href="#" className="hover:text-green-600 transition-colors ml-1">Privacy Policy</a>
            </footer>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-white to-green-100 flex items-center justify-center px-1">
      <div className="w-full max-w-sm lg:max-w-lg mx-auto lg:border lg:border-gray-200 lg:shadow-2xl lg:rounded-3xl lg:bg-white/90 lg:backdrop-blur-md lg:p-6">
        <div className="min-h-screen lg:min-h-0 relative overflow-hidden bg-gradient-to-br from-emerald-50 via-white to-green-100 lg:bg-transparent lg:rounded-2xl">
          {/* Animated Background */}
          <div className="absolute inset-0">
            <div className="absolute top-10 left-4 w-16 h-16 border-2 border-green-300/30 rounded-lg animate-spin-slow"></div>
            <div className="absolute top-32 right-6 w-14 h-14 bg-emerald-200/40 rounded-full animate-pulse-slow"></div>
            <div className="absolute top-64 left-1/3 w-10 h-10 border-2 border-green-400/25 rotate-45 animate-float"></div>
            <div className="absolute bottom-40 right-1/4 w-20 h-20 bg-green-100/35 rounded-full animate-float-delayed"></div>
            
            <div className="absolute top-1/4 left-1/4 w-48 h-48 bg-gradient-to-r from-green-200/20 to-transparent rounded-full animate-float-slow blur-xl"></div>
            <div className="absolute bottom-1/4 right-1/4 w-40 h-40 bg-gradient-to-l from-emerald-300/15 to-transparent rounded-full animate-float blur-xl"></div>
            
            <div className="absolute inset-0 opacity-5">
              <div className="grid grid-cols-8 lg:grid-cols-12 gap-6 p-3 h-full">
                {[...Array(48)].map((_, i) => (
                  <div key={i} className="w-2 h-2 bg-green-500 rounded-full animate-pulse" style={{animationDelay: `${i * 0.1}s`}}></div>
                ))}
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="relative z-10 min-h-screen lg:min-h-0 flex flex-col">
            <div className="flex-1 flex flex-col items-center justify-center px-1 lg:px-4 py-6">
              {/* Hero Image Container */}
              <div className="mb-6 animate-slide-in">
                <div className="relative rounded-2xl overflow-hidden shadow-2xl bg-white/10 backdrop-blur-sm border border-white/20">
                  <Image 
                    src="/car-banner.jpeg" 
                    alt="Driving Banner" 
                    width={600} 
                    height={300} 
                    className="w-full max-w-sm lg:max-w-md h-auto object-cover"
                    priority
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-green-900/20 to-transparent"></div>
                </div>
              </div>

              {/* Title and Tagline */}
              <div className="text-center mb-6 animate-fade-in-delayed px-1">
                <h1 className="text-3xl lg:text-4xl font-bold text-green-800 mb-3">
                Learn to Drive,<br/> Drive to Succeed!!
                </h1>
                
                <p className="text-green-700/80 text-sm lg:text-base mt-2">
                  Professional driving lessons to unlock your independence and confidence on the road
                </p>
              </div>

              {/* Form Container */}
              <div className="w-full animate-slide-up">
                <div className="bg-white/80 backdrop-blur-md rounded-2xl shadow-xl border border-white/30 p-3 lg:p-5 space-y-4">
                  
                  {/* Form Fields */}
                  <div className="space-y-3 lg:space-y-4">
                    <input 
                      className="w-full p-3 lg:p-4 border-2 border-green-200/50 rounded-xl focus:border-green-500 focus:outline-none transition-all duration-300 bg-white/70 backdrop-blur-sm hover:bg-white placeholder-gray-500 text-gray-800" 
                      name="name" 
                      placeholder="Full Name" 
                      value={formData.name} 
                      onChange={handleChange} 
                      disabled={isLoading}
                    />
                    
                    <input 
                      className="w-full p-3 lg:p-4 border-2 border-green-200/50 rounded-xl focus:border-green-500 focus:outline-none transition-all duration-300 bg-white/70 backdrop-blur-sm hover:bg-white placeholder-gray-500 text-gray-800" 
                      name="phone" 
                      placeholder="Phone Number" 
                      value={formData.phone} 
                      onChange={handleChange} 
                      disabled={isLoading}
                    />
                    
                    <input 
                      className="w-full p-3 lg:p-4 border-2 border-green-200/50 rounded-xl focus:border-green-500 focus:outline-none transition-all duration-300 bg-white/70 backdrop-blur-sm hover:bg-white placeholder-gray-500 text-gray-800" 
                      name="email" 
                      placeholder="Email Address" 
                      value={formData.email} 
                      onChange={handleChange} 
                      disabled={isLoading}
                    />

                    <select 
                      className="w-full p-3 lg:p-4 border-2 border-green-200/50 rounded-xl focus:border-green-500 focus:outline-none transition-all duration-300 bg-white/70 backdrop-blur-sm hover:bg-white text-gray-800" 
                      name="area" 
                      value={formData.area} 
                      onChange={handleChange}
                      disabled={isLoading}
                    >
                      <option value="" className="text-gray-500">Select Your Area</option>
                      {serviceableAreas.map(area => (
                        <option key={area} value={area}>{area}</option>
                      ))}
                      <option value="Other">Other</option>
                    </select>

                    {formData.area === 'Other' && (
                      <div className="animate-slide-down">
                        <input
                          className="w-full p-3 lg:p-4 border-2 border-green-200/50 rounded-xl focus:border-green-500 focus:outline-none transition-all duration-300 bg-white/70 backdrop-blur-sm hover:bg-white placeholder-gray-500 text-gray-800"
                          name="custom_area"
                          placeholder="Enter your area"
                          value={formData.custom_area}
                          onChange={handleChange}
                          disabled={isLoading}
                        />
                        <p className="text-sm text-red-500 mt-2 px-1 animate-fade-in">
                          ⚠️ We are currently not serving this location. Please fill out the form, and we&apos;ll get back to you with updates as soon as possible!!
                        </p>
                      </div>
                    )}

                    {showLicenseQ && (
                      <div className="space-y-3 animate-slide-down">
                        <label className="block font-semibold text-green-800 text-sm lg:text-base px-1">
                          Do you have a 4-wheeler driving license?
                        </label>
                        <div className="flex gap-2 lg:gap-3">
                          <button
                            type="button"
                            onClick={() => setFormData(prev => ({ ...prev, has_license: true }))}
                            disabled={isLoading}
                            className={`flex-1 px-3 lg:px-4 py-3 rounded-xl transition-all duration-300 transform hover:scale-105 font-medium text-sm lg:text-base disabled:opacity-50 disabled:cursor-not-allowed ${
                              formData.has_license === true 
                                ? 'bg-green-600 text-white shadow-lg' 
                                : 'bg-green-100 text-green-700 hover:bg-green-200'
                            }`}
                          >
                            ✓ Yes
                          </button>
                          <button
                            type="button"
                            onClick={() => setFormData(prev => ({ ...prev, has_license: false }))}
                            disabled={isLoading}
                            className={`flex-1 px-3 lg:px-4 py-3 rounded-xl transition-all duration-300 transform hover:scale-105 font-medium text-sm lg:text-base disabled:opacity-50 disabled:cursor-not-allowed ${
                              formData.has_license === false 
                                ? 'bg-green-600 text-white shadow-lg' 
                                : 'bg-green-100 text-green-700 hover:bg-green-200'
                            }`}
                          >
                            ✗ No
                          </button>
                        </div>
                        
                        {/* Message for No License */}
                        {formData.has_license === false && (
                          <div className="bg-blue-50 border border-blue-200 rounded-xl p-3 animate-fade-in">
                            <p className="text-sm text-blue-700">
                              📝 No worries! Please complete the form and we will get in touch with you for your driving license assistance along with your driving lessons.
                            </p>
                          </div>
                        )}
                      </div>
                    )}

                    {/* Submit Buttons */}
                    {showLicenseQ && formData.has_license === true && (
                      <button
                        onClick={handleSubmit}
                        disabled={isLoading}
                        className="w-full px-3 lg:px-4 py-3 lg:py-4 mt-4 bg-gradient-to-r from-green-600 to-emerald-600 text-white rounded-xl transition-all duration-300 transform hover:scale-105 hover:from-green-700 hover:to-emerald-700 shadow-lg font-semibold animate-slide-up text-sm lg:text-base disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
                      >
                        {isLoading ? '⏳ Processing...' : '💳 Pay Now & Start Learning'}
                      </button>
                    )}

                    {(!showLicenseQ || formData.has_license === false) && (
                      <button
                        onClick={handleSubmit}
                        disabled={isLoading}
                        className="w-full px-3 lg:px-4 py-3 lg:py-4 mt-4 bg-gradient-to-r from-green-600 to-emerald-600 text-white rounded-xl transition-all duration-300 transform hover:scale-105 hover:from-green-700 hover:to-emerald-700 shadow-lg font-semibold animate-slide-up text-sm lg:text-base disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
                      >
                        {isLoading ? '⏳ Processing...' : '🚗 Start Your Driving Journey'}
                      </button>
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* Footer */}
            <footer className="py-4 text-center text-sm text-gray-600 lg:relative lg:bottom-0 px-1">
              <a href="https://inlane.in/terms-and-conditions" className="hover:text-green-600 transition-colors">
                Terms & Conditions
              </a>
              {' '} | {' '}
              <a href="https://inlane.in/privacy-policy" className="hover:text-green-600 transition-colors">
                Privacy Policy
              </a>
            </footer>
          </div>

          {/* Custom Styles */}
          <style jsx>{`
            @keyframes float {
              0%, 100% { transform: translateY(0px); }
              50% { transform: translateY(-20px); }
            }
            @keyframes float-delayed {
              0%, 100% { transform: translateY(0px); }
              50% { transform: translateY(-15px); }
            }
            @keyframes float-slow {
              0%, 100% { transform: translateY(0px); }
              50% { transform: translateY(-10px); }
            }
            @keyframes spin-slow {
              from { transform: rotate(0deg); }
              to { transform: rotate(360deg); }
            }
            @keyframes pulse-slow {
              0%, 100% { opacity: 0.4; }
              50% { opacity: 0.8; }
            }
            @keyframes wave {
              0% { transform: translateX(0); }
              50% { transform: translateX(-25%); }
              100% { transform: translateX(-50%); }
            }
            @keyframes fade-in {
              from { opacity: 0; transform: translateY(20px); }
              to { opacity: 1; transform: translateY(0); }
            }
            @keyframes fade-in-delayed {
              from { opacity: 0; transform: translateY(20px); }
              to { opacity: 1; transform: translateY(0); }
            }
            @keyframes slide-in {
              from { opacity: 0; transform: translateX(-50px); }
              to { opacity: 1; transform: translateX(0); }
            }
            @keyframes slide-up {
              from { opacity: 0; transform: translateY(30px); }
              to { opacity: 1; transform: translateY(0); }
            }
            @keyframes slide-down {
              from { opacity: 0; transform: translateY(-20px); }
              to { opacity: 1; transform: translateY(0); }
            }
            @keyframes bounce-gentle {
              0%, 100% { transform: translateY(0); }
              50% { transform: translateY(-10px); }
            }

            .animate-float { animation: float 6s ease-in-out infinite; }
            .animate-float-delayed { animation: float-delayed 8s ease-in-out infinite; }
            .animate-float-slow { animation: float-slow 10s ease-in-out infinite; }
            .animate-spin-slow { animation: spin-slow 20s linear infinite; }
            .animate-pulse-slow { animation: pulse-slow 4s ease-in-out infinite; }
            .animate-wave { animation: wave 10s ease-in-out infinite; }
            .animate-fade-in { animation: fade-in 1s ease-out; }
            .animate-fade-in-delayed { animation: fade-in-delayed 1s ease-out 0.3s both; }
            .animate-slide-in { animation: slide-in 1s ease-out; }
            .animate-slide-up { animation: slide-up 0.6s ease-out; }
            .animate-slide-down { animation: slide-down 0.4s ease-out; }
            .animate-bounce-gentle { animation: bounce-gentle 2s ease-in-out infinite; }
          `}</style>
        </div>
      </div>
    </div>
  )
}
