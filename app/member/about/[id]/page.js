"use client"
import { useParams } from 'next/navigation'
import React, { useEffect } from 'react'

const page = () => {
    const { id } = useParams();

    return (
        <div className='w-full flex justify-center p-5 text-brown'>
            <div className='xl:w-[1200px] lg:w-[900px] md:w-[700px] sm:w-[500px] w-[500px]'>
                {id === 'about-us' &&
                    <React.Fragment>
                        <div className='text-3xl font-bold pb-10'>About Second-Hand Store</div>
                        <div className='flex flex-col gap-10'>
                            <p>Welcome to Second Hand Store!</p>
                            <p>At Second Hand Store, we're all about giving pre-loved items a second chance. Our passion for sustainability and reducing waste drives us to curate a unique selection of high-quality, gently used products at affordable prices. From clothing to furniture and electronics, we have something for everyone.</p>
                            <p>We believe in creating a positive impact on the environment and community. That's why a percentage of every purchase goes towards supporting local charities and initiatives focused on environmental preservation and community welfare.</p>
                            <p>Join us in embracing the beauty of pre-owned treasures, making a positive impact, and shopping sustainably. Discover hidden gems and shop with purpose at Second Hand Store!</p>
                            <p>Feel free to adjust this message further to fit your store's style and preferences. The key is to convey your commitment to sustainability, affordability, and community impact in a concise and engaging manner.</p>
                        </div>
                    </React.Fragment>
                }
                {id === 'shipping' &&
                    <React.Fragment>
                        <div className='text-3xl font-bold pb-10'>Shipping</div>
                        <div className='flex flex-col gap-10'>
                            <p>At Second Hand Store, we aim to make your shopping experience as convenient as possible. That's why we offer FREE shipping on all orders. No hidden fees or surprises – the price you see is the price you pay.</p>
                            <p>Our team works diligently to ensure that your order is carefully packaged and dispatched promptly. You can expect your items to arrive at your doorstep within 3-5 days in Thailand and 30 days in other countries from the date of purchase. For real-time tracking updates, simply log in to your account and follow your order's journey.</p>
                        </div>
                    </React.Fragment>
                }
                {id === 'payment' &&
                    <React.Fragment>
                        <div className='text-3xl font-bold pb-10'>Payment</div>
                        <div className='flex flex-col gap-10'>
                            <p>To make payment as convenient as possible, we offer a simple "Upload Slip" option. Here's how it works:</p>
                            <div className='font-bold border border-brown p-5'>
                                Bank: The Siam Commercial Bank Public Company Limited <br />
                                Account Number: 345-455-3453 <br />
                                Account Name: Second Hand store <br />
                            </div>
                            <ul className='list-decimal pl-5'>
                                <li>Select your items: Browse our wide selection of pre-loved treasures and add your chosen items to the cart.</li>
                                <li>Checkout: During the checkout process, choose the "Upload Slip" payment option.</li>
                                <li>Upload payment slip: After completing the order, you'll receive an order confirmation email with instructions on how to proceed with payment. To utilize the "Upload Slip" payment option, please ensure that you upload the payment slip within 3 days of placing your order.</li>
                                <li>Order processing: Once we receive and verify your payment slip, our team will process your order and get it ready for shipping.</li>
                            </ul>
                            <p>The "upload slip within 3 days" policy allows us to promptly fulfill orders and ensure a smooth shopping experience for all our valued customers.</p>
                            <p>If you encounter any challenges or have inquiries about the "upload slip" payment option or any other aspect, our dedicated customer support team is ready to assist you. Feel free to reach out to us via <strong>second-hand-store@gmail.com</strong></p>
                            <p>Thank you for choosing Second Hand Store for your shopping needs. Your support aids us in promoting sustainability while providing premium service and top-quality products.</p>
                            <p>Happy shopping!</p>
                        </div>
                    </React.Fragment>
                }
                {id === 'contact-us' &&
                    <React.Fragment>
                        <div className='text-3xl font-bold pb-10'>Contact Us</div>
                        <div className='flex flex-col gap-10'>
                            <p>We value your feedback, questions, and concerns at Second Hand Store. Our dedicated team is here to assist you and ensure your shopping experience is nothing short of exceptional. Whether you have inquiries about our products, need assistance with your order, or simply want to share your thoughts, we're just a message away.</p>
                            <ul className='list-decimal pl-5'>
                                <li>Customer Support Email: For general inquiries, order-related questions, or feedback, you can reach us at <strong>second-hand-store@gmail.com</strong>. Our team will respond to your email promptly, typically within 24 to 48 hours during regular business days.</li>
                                <li>Phone Support: If you prefer speaking to one of our friendly representatives, you can call our customer support hotline at <strong>02-345-8789</strong>. We are available to assist you from 10.00 to 18.00 p.m.</li>
                            </ul>
                            <p>Our goal is to ensure your complete satisfaction with our products and services. Your feedback is invaluable to us as we constantly strive to improve and deliver the best shopping experience possible.</p>
                            <p>Additionally, if you have any specific concerns regarding your order's delivery or experience any issues with your purchase, please don't hesitate to reach out to us. We are committed to resolving any challenges you may encounter promptly and efficiently.</p>
                            <p>Thank you for choosing Second Hand Store. We deeply appreciate your support in our mission to promote sustainability while providing a curated selection of pre-loved treasures.</p>
                            <p>Have a fantastic shopping spree!</p>
                        </div>
                    </React.Fragment>
                }
                {id === 'order-status' &&
                    <React.Fragment>
                        <div className='text-3xl font-bold pb-10'>Order Status</div>
                        <div className='flex flex-col gap-10'>
                            <ul className='list-decimal pl-5'>
                                <li><strong>Waiting To Pay &#40;Upload Slip within 3 days&#41;:</strong> Your order is currently in the "Waiting to Pay" status. You have items in your cart, and we're excited to fulfill your order. To proceed with your purchase, please complete the payment process within 3 days. After you've completed the order, your order details will be shown on your profile.</li>
                                <li><strong>Waiting:</strong> Your payment has been successfully submitted, and your order is now in the "Waiting" status. Our team is reviewing your payment to ensure its accuracy. Once verified, your order will progress to the next stage.</li>
                                <li><strong>Confirmed:</strong> Congratulations! Your payment has been verified, and your order is now in the "Confirmed" status. Our team is preparing your items for shipment, and you can expect an update with tracking information soon.</li>
                                <li><strong>Invalid &#40;Upload Slip within 3 days&#41;:</strong> Unfortunately, your payment was not successful, and your order has been placed in the "Invalid" status. To complete your purchase, please upload the payment slip within 3 days. Then your order details will be shown on your profile.</li>
                                <li><strong>Canceled &#40;by Employee&#41;:</strong> Your order has been canceled by one of our employees, typically due to a specific reason or request from you. If you have any questions regarding the cancellation, please reach out to our customer support for further clarification.</li>
                                <li><strong>Shipped:</strong> Congratulations! Your order is now in the "Shipped" status. Your items have been dispatched and are on their way to your specified delivery address. You can track your package using the provided tracking number.</li>
                                <li><strong>Received:</strong> Your order is now in the "Received" status, indicating that you have successfully received and confirmed your items. We sincerely hope you are delighted with your purchase. If you have any feedback or require assistance, feel free to contact our customer support team.</li>
                            </ul>
                            <p>Please ensure to complete the payment process and upload the payment slip within the specified time frame to avoid order cancellation or delays in processing.</p>
                            <p>If you have any questions or need updates regarding your order status, don't hesitate to contact us through our customer support channels.</p>
                            <p>Thank you for choosing Second Hand Store. We are committed to providing you with a seamless shopping experience and delivering pre-loved treasures to your doorstep with care and efficiency.</p>
                            <p>Enjoy your shopping!</p>
                        </div>
                    </React.Fragment>
                }
            </div>
        </div>
    )
}

export default page