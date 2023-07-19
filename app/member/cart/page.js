"use client"
import { useEffect, useState } from 'react'
import React from 'react'
import Image from 'next/image'
import { ButtonText, InputBox, InputFile, InputSelect } from '@components/inputs'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark } from '@fortawesome/free-solid-svg-icons'; 
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import '@/styles/toastStyles.css';
import { getFromLocalStorage, saveToLocalStorage } from '@lib/localStorage'
import { useRouter } from 'next/navigation'
import { getCartByProductId, updateProductStatusAndSaleId } from '@app/api/getAPI/product'
import { getPromotionByConditions } from '@app/api/getAPI/promotion'
import { getMemberAddressesById } from '@app/api/getAPI/member'
import { addSaleByMemberId } from '@app/api/getAPI/sale'
import { MetaProductStatus, MetaSaleStatus } from '@components/Meta'
import { DateFormat } from '@components/formats'
import { Result } from 'postcss'
import { addPayment } from '@app/api/getAPI/payment'
import { signIn } from '@auth/authMember';

const page = () => {
    const [newDeliveryAddress, setNewDeliveryAddress] = useState(false)
    const router = useRouter();
    const [auth, setAuth] = useState(null)
    const [form, setForm] = useState({})
    const [payment, setPayment] = useState({})
    const [meta, setMeta] = useState({Promotion: null, Delevery_Address: null})

    useEffect(() => {
        const _signIn = signIn()
        if(!_signIn) router.push('/login');
        else onLoadAuth()
    }, []);

    useEffect(() => {
        onLoad()
    },[auth])

    useEffect(() => {
        if (form?.Promotion) {
            const promotion = meta?.Promotion?.find((item) => item.Promotion_Id === parseInt(form?.Promotion));
                setForm({ ...form, Promotion_Data:promotion });
            }
    }, [form?.Promotion, meta?.Promotion]);

    const onLoadAuth = () =>{
        setAuth(getFromLocalStorage('auth'));
    }

    const handleAddressSelection = (event) => {
        setNewDeliveryAddress(false);
        setForm({...form, 
            Selected_Address: form?.Address?.[event.target.value], 
            Color_Address: parseInt(event.target.value),
            New_Fullname: '',
            New_Address: '',
            New_District: '',
            New_Province: '',
            New_Zipcode: '',
            New_Phone: '',
        });
    };
    const onLoad = async () => {
        if(!auth?.Product_Id?.length > 0) {return }
        const res = await getCartByProductId(auth?.Product_Id || []);
        if(res?.message === 'success' && res?.data){
            let total = 0;
            res?.data?.forEach((item) => {
                if(item?.Product_Status === MetaProductStatus?.[0]?.id){
                    total += item?.Product_Price
                } else {
                    auth.Product_Id = auth?.Product_Id?.filter((productId) => productId !== item.Product_Id);
                    saveToLocalStorage('auth', auth);
                    onLoadAuth();
                    onLoad();
                }
            });
            const address = await getMemberAddressesById(auth?.Member_Id);
            if(address?.message === 'success' && address?.data){
                let addr = [];
                address?.data?.forEach((item, index) => {
                    let add = item?.Member_Address.split('%');
                    addr.push({
                        Member_Id: item?.Member_Id || '',
                        Fullname: add[0] || '',
                        Address: add[1] || '',
                        District: add[2] || '',
                        Province: add[3] || '',
                        Zipcode: add[4] || '',
                        Phone: add[5] || '',
                        Member_Address: item?.Member_Address || ''
                    })
                })
                setForm({
                    Product: res?.data,
                    Sale_Total_Price: total,
                    Address: addr
                })
            }
            const promotion = await getPromotionByConditions({"Sale_Total_Price": total, "Member_Id": auth?.Member_Id});
            if(promotion?.message === 'success' && promotion?.data){
                let _p = promotion?.data?.map(({ Promotion_Id, Promotion_Name, ...otherProperties }) => ({
                    id: Promotion_Id,
                    name: Promotion_Name,
                    Promotion_Id,
                    Promotion_Name,
                    ...otherProperties,
                }));
                setMeta({...meta, Promotion: _p})
            }
        }
    }

    const onDeleteProduct = (id) => {
        if (auth?.Product_Id?.length > 0) {
            auth.Product_Id = auth.Product_Id.filter((productId) => productId !== id.Product_Id);
            saveToLocalStorage('auth', auth);
            onLoadAuth();
            onLoad();
        }
    }

    const onSave = async () => {
        let sale = null;
        let address = null;
        if(form?.Selected_Address){
            address = form.Selected_Address.Member_Address;
        }else if(form?.New_Fullname || form?.New_Address || form?.New_District || form?.New_Province || form?.New_Zipcode || form?.New_Phone){
            if(!(form?.New_Fullname && form?.New_Address && form?.New_District && form?.New_Province && form?.New_Zipcode && form?.New_Phone)){
                return toast.error("🤍 Please fill out all new delivery address fields.", {
                    autoClose: 2000,
                });
            }
            address = form?.New_Fullname + "%" + form?.New_Address + "%" + form?.New_District + "%" + form?.New_Province + "%" + form?.New_Zipcode + "%" + form?.New_Phone + "%";
        }
        else{
            return toast.error("🤍 Please select your delivery address.", {
                autoClose: 2000,
            });
        }
        
        sale = {
            Delivery_Address: address,
            Sale_Date: DateFormat(new Date),
            Sale_Status: form?.Payment_Slip ? MetaSaleStatus?.[1]?.id : MetaSaleStatus?.[0]?.id,
            Sale_Tracking_Number: null,
            Member_Id: auth?.Member_Id || null,
            Sale_Total_Price: form?.Sale_Total_Price || 0,
            Discounted_Total_Price: form?.Promotion_Data?.Promotion_Id ?  (parseFloat(form?.Sale_Total_Price)-(parseFloat(form?.Sale_Total_Price) * (form?.Promotion_Data?.Promotion_Discount / 100))) : null,
            Promotion_Id: form?.Promotion_Data?.Promotion_Id || null
        }

        const res = await addSaleByMemberId(sale)
        if(res?.message === 'success'){
            const product = await updateProductStatusAndSaleId({
                "Product_Id": auth?.Product_Id || [], 
                "Product_Status": MetaProductStatus?.[1]?.id,
                "Sale_Id": res?.data?.insertId || null, 
            });
            if(product?.message === 'success'){
                toast.success("🤍 We've received your order.", {
                    autoClose: 2000,
                });
            }

            if(form?.Payment_Slip){
                const payment = await addPayment({
                    "Sale_Id": res?.data?.insertId || null, 
                    "Payment_Slip": form?.Payment_Slip
                })
                if(payment?.message === 'success'){
                    toast.success("🤍 We've received your Slip.", {
                        autoClose: 2000,
                    });
                }
            }
            auth.Product_Id = null;
            saveToLocalStorage('auth', auth);
            onLoadAuth();
            onLoad();
        }
        else{
            toast.error("❗️Something's wrong, please, try again.", {
                autoClose: 2000,
            });
        }
    }
console.log(form);
    const onChange = (update) => setForm({ ...form, ...update })

    return (
        <div className='flex flex-col items-center w-full mb-10'>
            <div className='min-h-[600px] xl:w-[1120px] lg:w-[820px] md:w-[620px] sm:w-96 w-72 border border-brown grid lg:grid-cols-3 grid-cols-1'>
                {(auth?.Product_Id && auth?.Product_Id?.length > 0) ?
                <>
                    <div className='lg:col-span-2 col-span-1 p-10 flex flex-col gap-3 md:border-r border-brown'>
                        <div className='text-3xl'>Summary</div>
                        <div className='w-full flex justify-between text-[10px] font-light'>
                            <span>PRODUCT</span>
                            <span>PRICE</span>
                        </div>
                        <div className={`${newDeliveryAddress ? 'h-[650px]' : 'h-[510px]'} border-y border-brown py-2 w-full overflow-auto`}>
                            {form?.Product?.map((item, index, array) => {
                                return <React.Fragment key={"Customer-Order"+index}>
                                    <div className='w-full grid grid-cols-1 md:grid-cols-3'>
                                        <div className='md:col-span-2 flex gap-2'>
                                        <FontAwesomeIcon onClick={() => onDeleteProduct(item)} icon={faXmark} className='cursor-pointer'/>
                                            <div>
                                                <Image src={item?.Product_Image || "/assets/images/avatars/no-image.png"} alt="Product" width={80} height={100} className='w-[80px] h-[100px]'/>
                                            </div>
                                            <div className='flex flex-col font-light'>
                                                <span>{item?.Product_Name || ''}</span>
                                                <span className='text-xs'>Size: {item?.Size_Name || '-'}</span>
                                                <span className='text-xs'>Detail: {item?.Product_Size_Detail || '-'}</span>
                                            </div>
                                        </div>
                                        <div className='md:col-start-3 r font-light'>฿{item?.Product_Price?.toFixed(2) || ''} Baht</div>
                                    </div>  
                                    {index !== array.length - 1 && <div className='md:col-start-3 border-b border-gray my-2'></div>}
                                </React.Fragment>
                            })}
                        </div>

                        { meta?.Promotion?.length > 0 && 
                            <>
                                <InputSelect onChange={(Promotion) => onChange({ Promotion })} options={meta?.Promotion} value={form?.Promotion || ''} placeholder={'Get your discount here'} classBox='w-full font-extrabold'/>
                                <div className='w-full r font-semibold'>
                                    {form?.Promotion_Data?.Promotion_Name || 'Select discount'} ฿{((parseFloat(form?.Sale_Total_Price) * (form?.Promotion_Data?.Promotion_Discount / 100)) || 0).toFixed(2) || '0.00'} Baht
                                </div>
                            </>
                        }
                        <div className='w-full border-b border-gray'></div>
                        <div className='w-full r font-semibold'>Subtotal ฿{(parseFloat(form?.Sale_Total_Price)-(parseFloat(form?.Sale_Total_Price) * (form?.Promotion_Data?.Promotion_Discount / 100)) || parseFloat(form?.Sale_Total_Price)).toFixed(2) || '0.00'} Baht</div>
                        <div className='w-full border-b border-gray'></div>
                    </div>
                    <div className='p-10 col-span-1 flex flex-col gap-3'>
                        <div className='py-2 text-xl font-light'>Delivery Information</div>
                        <div className='w-full flex flex-col gap-3 max-h-[260px] overflow-y-auto'>
                            {form?.Address?.map((item,index) => (
                                <label className={`${form?.Color_Address === index ? 'bg-brown text-white' : ''} cursor-pointer p-3 border border-brown w-full font-light`} key={"Customer-Address" + index}>
                                    <input type="radio" name="selectedAddress" onChange={handleAddressSelection} value={index} className="hidden"/>
                                    <div>{item?.Fullname || ''}</div>
                                    <div>{item?.Address || ''} {item?.District || ''} {item?.Province || ''} {item?.Zipcode || ''}</div>
                                    <div>Phone: {item?.Phone || '-'}</div>
                                </label>
                            ))}
                        </div>
                        {!newDeliveryAddress && <div onClick={() => {setNewDeliveryAddress(true); setForm({...form, Selected_Address: null, Color_Address: null})}} className='cursor-pointer p-3 border border-brown w-full font-light'>Add New Address</div>}
                        {newDeliveryAddress &&
                            <div className='w-full'>
                                <InputBox onChange={(New_Fullname) => onChange({ New_Fullname })} value={form?.New_Fullname || ''} placeholder='Fullname' classBox='w-full'/>
                                <InputBox onChange={(New_Address) => onChange({ New_Address })} value={form?.New_Address || ''} placeholder='Address' classBox='w-full'/>
                                <div className='flex w-full'>
                                    <InputBox onChange={(New_District) => onChange({ New_District })} value={form?.New_District || ''} placeholder='District' classBox='w-full border-r border-brown'/>
                                    <InputBox onChange={(New_Province) => onChange({ New_Province })} value={form?.New_Province || ''} placeholder='Province' classBox='w-full'/>
                                </div>
                                <div className='flex w-full'>
                                    <InputBox number={true} onChange={(New_Zipcode) => onChange({ New_Zipcode })} value={form?.New_Zipcode || ''} placeholder='Zip code' classBox='w-full border-r border-brown'/>
                                    <InputBox number={true} onChange={(New_Phone) => onChange({ New_Phone })} value={form?.New_Phone || ''} placeholder='Phone' classBox='w-full'/>
                                </div>
                            </div>
                        }
                        <InputFile onChange={(Payment_Slip) => onChange({ Payment_Slip })} value={form?.Payment_Slip || ''} placeholder='Profile Picture' classBox='w-full'/>
                        <label htmlFor="order_slip" className='w-full l text-xs text-greyV1'>Upload slip here. ( later within 3 days )</label>
                        <ButtonText onClick={() => onSave()} placeholder='CHECK OUT' classBox='w-full'/>
                    </div>
                </>
                :
                <div onClick={() => router.push('/')} className='px-10 text-2xl flex_center text-center font-bold cursor-pointer lg:col-span-3 col-span-1'>
                    Let's add some product!
                </div>
                }
            </div>
        </div>
    )
}

export default page