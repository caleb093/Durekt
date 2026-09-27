import HomeLayout from "@/components/layouts/HomeLayout"

const TermsOfService = () => {
    const headerStyle = "text-[20px] sm:text-[24px] leading-7 sm:leading-10 font-[500] text-[#333333] pb-2"

    return (
        <HomeLayout>
            <div className="bg-white text-[#545454] py-[3em] sm:py-[4em] ">
                <div className="w-[90%] mdx2:w-[52em] text-center mx-auto ">
                    <div className="mb-8 sm:mb-16">
                        <h1 className="text-[35px] sm:text-[48px] text-[#333333] font-[700] leading-[40px] sm:leading-[60px]">Terms and Conditions for Durekt</h1>
                    </div>
                    
                    <div className="text-left flex flex-col gap-5 leading-[28px]">
                        <p>Effective Date: November 1st, 2024</p>
                        <p>These Terms and Conditions ("Terms") govern your access to and use of the Durekt website (the "Site"), as well as the use of Durekt’s software services ("Services"). By accessing or using the Site and Services, you agree to comply with these Terms. If you do not agree to these Terms, you should not access or use the Site or Services.</p>
                    </div>

                    <div className="text-left text-[14px] sm:text-[16px] leading-[28px]">
                        <div className="mt-4">
                            <h1 className={`${headerStyle}`}>1. Acceptance of Terms</h1>
                            <p className="pb-8">By accessing or using the Durekt website and Services, you agree to be bound by these Terms, as well as any additional guidelines, rules, or policies that may be posted on the Site. Durekt reserves the right to modify, update, or change these Terms at any time. Any changes will be effective immediately upon posting on the Site.</p>
                        </div>

                        <div className="mt-4">
                            <h1 className={`${headerStyle}`}>2. Use of the Site and Services</h1>
                            <div className="pb-8">
                                <p><span className="font-[700]">Eligibility:</span> You must be at least 18 years old to use the Site and Services. By using the Site and Services, you represent that you are at least 18 years of age and have the legal capacity to agree to these Terms.</p>
                                <p><span className="font-[700]">Account Registration:</span> In order to access certain features or services, you may be required to create an account on the Site. You agree to provide accurate and complete information when creating your account and to update such information promptly to keep it accurate.</p>
                                <p><span className="font-[700]">Permitted Use:</span> You may use the Site and Services for lawful purposes only and in accordance with these Terms. You agree not to:</p>
                                <li>Violate any laws, regulations, or third-party rights.</li>
                                <li>Engage in any activity that may harm, disrupt, or interfere with the operation of the Site or Services.</li>
                                <li>Use the Site or Services for any commercial purposes without Durekt’s prior written consent.</li>

                            </div>
                        </div>

                        <div className="mt-4">
                            <h1 className={`${headerStyle}`}>3. Services Provided</h1>
                            
                            <div className="pb-8">
                                <p>Durekt offers a suite of AI-driven software tools designed to analyze sales call interactions, grade sales performance, and provide actionable feedback to sales teams. The Services include:</p>
                                <div className="mt-4">
                                    <li>Sales call interaction analysis</li>
                                    <li>Grading of sales calls based on proprietary AI algorithms</li>
                                    <li>Secure data transmission for backend analysis</li>
                                    <li>Performance tracking and reporting via a dashboard</li>
                                    <li>Forecasting and planning tools based on historical data and predictive analytics</li>
                                </div>
                            </div>
                        </div>

                        <div className="mt-4">
                            <h1 className={`${headerStyle}`}>4. Intellectual Property and Proprietary Rights</h1>
                            <div className="pb-8">
                                <p><span className="font-[700]">Ownership of Durekt Technology:</span> : All software, algorithms, methodologies, and underlying technology (collectively, the "Durekt Technology") used in connection with the Site and Services, including the AI algorithms, data models, grading systems, and reports, are the exclusive property of Durekt and are protected by copyright, trade secret, patent, and other intellectual property laws.</p>
                                <p><span className="font-[700]">License to Use:</span> Durekt grants you a limited, non-exclusive, non-transferable license to access and use the Services for your internal business purposes, subject to these Terms. This license does not grant you any rights to modify, copy, distribute, or reverse engineer any part of the Durekt Technology, including the algorithms, data, or reports.</p>
                                <p><span className="font-[700]">Restrictions:</span> You agree not to:</p>

                                <div className="my-2">
                                    <li>Decompile, disassemble, reverse engineer, or attempt to extract the source code of any part of the Durekt Technology.</li>
                                    <li>Use the Durekt Technology for any purpose other than as permitted by these Terms.</li>
                                    <li>License, sublicense, distribute, or otherwise transfer access to the Services to any third party without Durekt’s prior written consent.</li>
                                </div>

                                <p><span className="font-[700]">Feedback and Improvements: </span>If you provide any suggestions, feedback, or ideas regarding the Site or Services ("Feedback"), you acknowledge and agree that Durekt may use and incorporate such Feedback into its technology and Services without compensation to you and without any obligation to you.</p>
                            </div>
                        </div>

                        <div className="mt-4">
                            <h1 className={`${headerStyle}`}>5. Data Collection, Privacy, and Security</h1>
                            <div className="pb-8">
                                <p><span className="font-[700]">Data Usage:</span> By using the Services, you consent to the collection, use, and processing of your data, including sales call recordings, performance metrics, and other data generated by your team’s interactions with the platform, in accordance with Durekt's Privacy Policy. This data may be used to improve the quality of the Services, develop new features, and enhance the AI algorithms.</p>
                                <p><span className="font-[700]">Privacy Policy:</span> For more information on how we collect, use, and protect your personal and organizational data, please refer to our [Privacy Policy](#).</p>
                                <p><span className="font-[700]">Data Security:</span> Durekt implements reasonable technical and organizational measures to protect the data you provide from unauthorized access, disclosure, alteration, or destruction. However, no method of transmission over the Internet is entirely secure, and we cannot guarantee absolute security.</p>
                            </div>
                        </div>

                        <div className="mt-4">
                            <h1 className={`${headerStyle}`}>6. Subscriptions, Payment, and Billing</h1>
                            <div className="pb-8">
                                <p><span className="font-[700]">Pricing:</span> Access to certain features of the Services may require a subscription. Pricing details, including applicable fees and payment terms, will be outlined during the subscription process or in your contract with Durekt.</p>
                                <p><span className="font-[700]">Billing and Payment:</span> You agree to pay all fees associated with the Services as they become due. All payments will be processed in accordance with the terms set forth on the Site or in your subscription agreement.</p>
                                <p><span className="font-[700]">Refund Policy:</span> All sales are final. However, you may contact our support team if you believe there are issues with the Services.</p>
                            </div>
                        </div>

                        <div className="mt-4">
                            <h1 className={`${headerStyle}`}>7. Termination</h1>
                            <div className="pb-8">
                                <p><span className="font-[700]">Termination by Durekt:</span> Durekt reserves the right to suspend or terminate your access to the Site or Services at any time, with or without cause, including if you violate these Terms or for any other reason deemed appropriate by Durekt. Upon termination, your right to use the Site and Services will immediately cease, and you must promptly stop using all Durekt Content.</p>
                                <p><span className="font-[700]">Effect of Termination:</span> Upon termination, any data related to your account may be deleted or anonymized in accordance with Durekt’s Privacy Policy. You may request a copy of your data prior to termination in accordance with applicable laws.</p>
                            </div>
                        </div>

                        <div className="mt-4">
                            <h1 className={`${headerStyle}`}>8. Disclaimers and Limitation of Liability</h1>
                            <div className="pb-8">
                                <p><span className="font-[700]">No Warranty:</span> The Site and Services are provided "as is" and "as available," without warranty of any kind, either express or implied, including but not limited to warranties of merchantability, fitness for a particular purpose, or non-infringement. Durekt does not guarantee the accuracy, completeness, or performance of the Services.</p>
                                <p><span className="font-[700]">Limitation of Liability:</span> To the fullest extent permitted by law, Durekt’s liability shall be limited to the amount you paid for the Services during the three (3) months prior to the event giving rise to the claim. In no event shall Durekt be liable for any indirect, incidental, consequential, special, or punitive damages arising from your use of the Site or Services, including, but not limited to, loss of profits, data, or business opportunities.</p>
                            </div>
                        </div>

                        <div className="mt-4">
                            <h1 className={`${headerStyle}`}>9. Indemnification</h1>
                            <p className="pb-8">You agree to indemnify, defend, and hold harmless Durekt, its affiliates, employees, agents, and partners from and against any claims, damages, liabilities, losses, and expenses, including reasonable attorneys’ fees, arising from your use of the Site and Services, your violation of these Terms, or your infringement of any intellectual property or other rights of any third party.</p>
                        </div>

                        <div className="mt-4">
                            <h1 className={`${headerStyle}`}>10. Governing Law and Dispute Resolution</h1>
                            <div className="pb-8">
                                <p><span className="font-[700]">Governing Law:</span> These Terms are governed by and construed in accordance with the laws of [Your State/Country], without regard to its conflict of law principles.</p>
                                <p><span className="font-[700]">Dispute Resolution:</span> Any disputes arising from or related to these Terms will be resolved through binding arbitration in [Your State/Country] in accordance with the rules of [Arbitration Institution]. Both parties agree to waive their right to a trial by jury and any class action claims.</p>
                            </div>
                        </div>

                        <div className="mt-4">
                            <h1 className={`${headerStyle}`}>11. Modifications to the Terms</h1>
                            <p className="pb-8">Durekt reserves the right to modify or update these Terms at any time. We will notify you of any material changes to the Terms by posting a revised version on this page. Your continued use of the Site and Services after any changes to these Terms will constitute your acceptance of the modified Terms.</p>
                        </div>

                        <div className="mt-4">
                            <h1 className={`${headerStyle}`}>12. Contact Us</h1>
                            <p className="pb-8">If you have any questions about these Terms or the Services, please contact us at:</p>
                        </div>

                        <p>Durekt Support</p>
                        <p>Email: [help@durekt.com]</p>
                    </div>
                </div>
            </div>
        </HomeLayout>
    )
}

export default TermsOfService