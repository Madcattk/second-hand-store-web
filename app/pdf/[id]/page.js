"use client"
import { useParams, useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import { Page, Text, View, Document, StyleSheet, PDFViewer, Font } from '@react-pdf/renderer';
import { DateFormat } from '@components/formats';
import { signIn } from '@auth/authMember';
import { signIn as signInEmp } from '@auth/authEmployee';
import Loading from '@components/pages/Loading';
import { getSaleById } from '@app/api/getAPI/sale';
import { getFromLocalStorage } from '@lib/localStorage';
import { MetaSaleStatus } from '@components/Meta';

const page = () => {
    const router = useRouter();
    const { id } = useParams()
    const auth = getFromLocalStorage('auth')
    const [form, setForm] = useState(null);
    const [loading, setLoading] = useState(true)
    Font.register({
        family: 'ThaiFont',
        src: '/fonts/THSarabunNew/THSarabunNew.ttf', // Note the leading slash
    });
    Font.register({
        family: 'ThaiFontBold',
        src: '/fonts/THSarabunNew/THSarabunNew-Bold.ttf', // Note the leading slash
    });
    const styles = StyleSheet.create({
        page: {
          flexDirection: 'portrait', // Portrait orientation
          backgroundColor: 'white', // A4 page is typically white
          width: '210mm', // A4 width in millimeters
          height: '297mm', // A4 height in millimeters
          paddingTop: '10mm', // Top margin
          paddingRight: '10mm', // Right margin
          paddingBottom: '10mm', // Bottom margin
          paddingLeft: '10mm', // Left margin
        },
        section: {
            margin: 10,
            padding: 10,
            flexGrow: 1,
        },
        borderSection: {
            borderBottom: 1,
            borderBottomColor: '#B4B4B3',
            borderTop: 1,
            borderTopColor: '#B4B4B3',
            paddingVertical: 5
        },
        productSection: {
            paddingHorizontal: 5,
            borderBottom: 1,
            borderBottomColor: '#eee',
        },
        space: {
            marginBottom: 10
        },
        flex: {
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-between'
        },
        text: {
            fontSize: 14,
            fontFamily: 'ThaiFont'
        }
    });

    useEffect(() => {
        if(signIn() || signInEmp()) {
            onLoad()
            setLoading(false)
        }
        else router.replace('/login')
    },[])

    const onLoad = async () => {
        const res = await getSaleById(id)
        if(res?.message === 'success' && res?.data?.Product?.length > 0){   
            let address = null;
            let add = res?.data?.Delivery_Address?.split('%');
            address = {
                Member_Id: res?.data?.Member_Id || '',
                Fullname: add[0] || '',
                Address: add[1] || '',
                District: add[2] || '',
                Province: add[3] || '',
                Zipcode: add[4] || '',
                Country: add[5] || '',
                Phone: add[6] || '',
                Member_Address: res?.data?.Delivery_Address || ''
            }
            const updatedData = { ...res.data, Address: address };
            res.data = updatedData;
            if((res?.data?.Member_Id === auth?.Member_Id || auth?.Employee_Id) && 
            (res?.data?.Sale_Status === MetaSaleStatus?.[2]?.id || 
            res?.data?.Sale_Status === MetaSaleStatus?.[5]?.id || 
            res?.data?.Sale_Status === MetaSaleStatus?.[6]?.id)){
                setLoading(false)
                setForm(res?.data || []);
            } else {
                router.back();
            }
        } else {
            router.back();
        }
    }
    
    return (
        <Loading loading={loading}>
            <div className='flex_center w-full h-full'>
                <PDFViewer className='w-screen h-screen'>
                    <Document>
                        <Page size="A4" style={styles.page}>
                        <View style={styles.section}>
                            <View style={{ display: 'flex', alignItems: 'center' }}>
                                <Text style={{ fontSize: 16, paddingBottom: 10, fontFamily: 'ThaiFontBold' }}>Second Hand Store</Text>
                            </View>
                            <View style={{ display: 'flex', alignItems: 'center', flexDirection: 'row', justifyContent: 'space-between' }}>
                                <Text style={{ fontSize: 14, fontFamily: 'ThaiFontBold' }}>Order Receipt No: {form?.Sale_Id || ''}</Text>
                                <Text style={{ fontSize: 14, fontFamily: 'ThaiFontBold' }}>Date: {DateFormat(form?.Sale_Date)}</Text>
                            </View>
                            <View style={styles.borderSection}>
                                <Text style={styles.text}>{form?.Address?.Fullname || ''}</Text>
                                <Text style={styles.text}>{form?.Address?.Address || ''} {form?.Address?.District || ''} {form?.Address?.Province || ''} {form?.Address?.Zipcode || ''} {form?.Address?.Country || ''}</Text>
                                <Text style={styles.text}>Phone: {form?.Address?.Phone || ''}</Text>
                            </View>
                            <View style={styles.space}>
                            </View>
                            <Text style={styles.text}>Product</Text>
                            <View style={styles.borderSection}>
                                {form?.Product?.map((item, index) => {
                                    return <View key={"Product"+index} style={styles.productSection}>
                                        <View style={styles.flex}>
                                            <Text style={styles.text}>{index + 1} {item?.Product_Name || ''} ( Size: {item?.Size_Name || '-'} )</Text>
                                            <Text style={styles.text}>{item?.Product_Price?.toFixed(2) || ''} Baht</Text>
                                        </View>
                                    </View>
                                })}
                                    <View style={{paddingHorizontal: 5}}>
                                        {form?.Promotion_Id &&
                                            <>
                                                <View style={styles.flex}>
                                                    <Text style={styles.text}>Subtotal</Text>
                                                    <Text style={styles.text}>{form?.Sale_Total_Price?.toFixed(2) || ''} Baht</Text>
                                                </View>
                                                <View style={styles.flex}>
                                                    <Text style={styles.text}>{form?.Promotion_Name || ''}</Text>
                                                    <Text style={styles.text}>{((parseFloat(form?.Sale_Total_Price) * (form?.Promotion_Discount / 100)) || 0).toFixed(2) || '0.00'} Baht</Text>
                                                </View>
                                            </>
                                        }
                                        <View style={styles.flex}>
                                            <Text style={{ fontSize: 14, fontFamily: 'ThaiFontBold' }}>Total</Text>
                                            <Text style={{ fontSize: 14, fontFamily: 'ThaiFontBold' }}>{form?.Discounted_Total_Price?.toFixed(2) || form?.Sale_Total_Price?.toFixed(2)} Baht</Text>
                                        </View>
                                    </View>
                            </View>
                            <View style={{ display: 'flex', alignItems: 'center', paddingVertical: 10 }}>
                                <Text style={styles.text}>Thank You</Text>
                            </View>
                        </View>
                        </Page>
                    </Document>
                </PDFViewer>
            </div>
        </Loading>
    )
}

export default page