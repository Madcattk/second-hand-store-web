"use client"
import React, { useEffect, useState } from 'react';
import { getBestSellerProductReport, getSummaryRevenue } from '@app/api/getAPI/sale';
import { DateFormat } from '@components/formats';
import { useParams } from 'next/navigation';
import { Page, Text, View, Document, StyleSheet, PDFViewer, Font } from '@react-pdf/renderer';

const page = () => {
    const { id } = useParams()
    let _d = id?.split('%');
    const [form, setForm] = useState([])
    const [date, setDate] = useState({
        Start_Date: _d?.[0],
        End_Date: _d?.[1]
    });
    let total = 0;
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
        text: {
            fontSize: 10,
            marginBottom: 5,
            fontFamily: 'ThaiFont'
        },
        table: {
            display: 'table',
            width: '100%',
        },
        tableRowTH: {
            flexDirection: 'row',
            backgroundColor: '#eee9',
            borderBottomColor: '#eee', // Set the border color for horizontal lines
            borderBottomWidth: 1,   // Set the border width for horizontal lines
            fontFamily: 'ThaiFontBold',
        },
        tableRow: {
            flexDirection: 'row',
            borderBottomColor: '#eee', // Set the border color for horizontal lines
            borderBottomWidth: 1,   // Set the border width for horizontal lines
        },
    });

    useEffect(() => {
        onLoad()
    },[])

    const onLoad = async () => {
        if(!(date?.Start_Date && date?.End_Date)) { return }

        const resBestSellerProduct = await getBestSellerProductReport({
            "Start_Date": date?.Start_Date,
            "End_Date": date?.End_Date
        }) 
        const resSummaryRevenue = await getSummaryRevenue({
            "Start_Date": date?.Start_Date,
            "End_Date": date?.End_Date
        }) 
        if(resBestSellerProduct.message == 'success' && resSummaryRevenue.message == 'success'){
            setForm({Best_Seller: resBestSellerProduct?.data || [], Summary: resSummaryRevenue?.data || []})
        }
    }

    const downloadPdf = (pdf) => {
        let link = document.createElement('a');
        link.target = '_blank';
        link.href = pdf.output('bloburl');
        link.download = 'second_hand_store_report_' + date?.Start_Date + '_' + date?.End_Date + '.pdf';
        link.click();
        link.remove();
    }

    return (
        <div className='flex_center w-full h-full gap-10'>
            <PDFViewer className='w-screen h-screen'>
                <Document>
                    <Page size="A4" style={styles.page}>
                        <View style={styles.section}>
                        <View style={{ display: 'flex', alignItems: 'center' }}>
                            <Text style={{ fontSize: 16, paddingBottom: 10, fontFamily: 'ThaiFontBold' }}>Report for the period: {date?.Start_Date} to {date?.End_Date}</Text>
                        </View>
                        <Text style={{ fontSize: 16, paddingBottom: 10, paddingTop: 10, fontFamily: 'ThaiFontBold'  }}>Best Seller Product Report</Text>
                        {form?.Best_Seller?.map((item, index) => {
                            return  <View key={'Best-Seller'+index} style={{ marginBottom: 5}}>
                            <Text style={{ fontSize: 15, paddingBottom: 5, fontFamily: 'ThaiFontBold' }}>{item?.Product_Type_Name || ''}</Text>
                            <Text style={{fontSize: 16, fontFamily: 'ThaiFont'}}>Sales: {item?.Count || '0'}</Text>
                            <View style={{ flexDirection: 'row', paddingBottom: 5, borderBottom: 1, borderBottomColor: '#eee' }}>
                                <Text style={{ fontSize: 16, fontFamily: 'ThaiFont', color: 'black' }}>Total:</Text>
                                <Text style={{ fontSize: 15, color: '#D71313', fontFamily: 'ThaiFontBold' }}> {item?.Total_Price.toFixed(2) || '0'} </Text>
                                <Text style={{ fontSize: 16, fontFamily: 'ThaiFont', color: 'black' }}>Baht</Text>
                            </View>
                            </View>
                        })}
                        </View>
                    </Page>
                    <Page size="A4" style={styles.page}>
                        <View style={styles.section}>
                        <Text style={{ fontSize: 16, paddingBottom: 10, paddingTop: 10, fontFamily: 'ThaiFontBold'  }}>Summary Revenue</Text>
                        {/* Table */}
                        <View style={styles.table}>
                            <View style={styles.tableRowTH}>
                                <View style={{ borderWidth: 0, padding: 7, flex: 1, textAlign: 'left',}}>
                                    <Text style={{ fontSize: 15, fontFamily: 'ThaiFontBold' }}>Sale ID</Text>
                                </View>
                                <View style={{ borderWidth: 0, padding: 7, flex: 1, textAlign: 'center',}}>
                                    <Text style={{ fontSize: 15, fontFamily: 'ThaiFontBold' }}>Sale Date</Text>
                                </View>
                                <View style={{ borderWidth: 0, padding: 7, flex: 1, textAlign: 'center',}}>
                                    <Text style={{ fontSize: 15, fontFamily: 'ThaiFontBold' }}>Sale Status</Text>
                                </View>
                                <View style={{ borderWidth: 0, padding: 7, flex: 1, textAlign: 'right',}}>
                                    <Text style={{ fontSize: 15, fontFamily: 'ThaiFontBold' }}>Subtotal</Text>
                                </View>
                                <View style={{ borderWidth: 0, padding: 7, flex: 1, textAlign: 'right',}}>
                                    <Text style={{ fontSize: 15, fontFamily: 'ThaiFontBold' }}>Discount</Text>
                                </View>
                                <View style={{ borderWidth: 0, padding: 7, flex: 1, textAlign: 'right',}}>
                                    <Text style={{ fontSize: 15, fontFamily: 'ThaiFontBold' }}>Total</Text>
                                </View>
                            </View>
                            {form?.Summary?.map((item, index) => {
                                total += item?.Discounted_Total_Price ? item?.Discounted_Total_Price : item?.Sale_Total_Price;
                                return <React.Fragment key={'summary'+index}>
                                    <View style={styles.tableRowTH}>
                                    <View style={{ borderWidth: 0, padding: 7, flex: 1, textAlign: 'left',}}>
                                        <Text style={{ fontSize: 16, fontFamily: 'ThaiFont', }}>{item?.Sale_Id || '-'}</Text>
                                    </View>
                                    <View style={{ borderWidth: 0, padding: 7, flex: 1, textAlign: 'center',}}>
                                        <Text style={{ fontSize: 16, fontFamily: 'ThaiFont', }}>{DateFormat(item?.Sale_Date) || '-'}</Text>
                                    </View>
                                    <View style={{ borderWidth: 0, padding: 7, flex: 1, textAlign: 'center',}}>
                                        <Text style={{ fontSize: 16, fontFamily: 'ThaiFont', }}>{item?.Sale_Status || '-'}</Text>
                                    </View>
                                    <View style={{ borderWidth: 0, padding: 7, flex: 1, textAlign: 'right',}}>
                                        <Text style={{ fontSize: 16, fontFamily: 'ThaiFont', }}>{item?.Sale_Total_Price.toFixed(2) || '0.00'}</Text>
                                    </View>
                                    <View style={{ borderWidth: 0, padding: 7, flex: 1, textAlign: 'right',}}>
                                        <Text style={{ fontSize: 16, fontFamily: 'ThaiFont', }}>{item?.Promotion_Discount || '0'}%</Text>
                                    </View>
                                    <View style={{ borderWidth: 0, padding: 7, flex: 1, textAlign: 'right',}}>
                                        <Text style={{ fontSize: 16, fontFamily: 'ThaiFont', }}>{item?.Discounted_Total_Price ? item?.Discounted_Total_Price.toFixed(2) : item?.Sale_Total_Price.toFixed(2) || '0.00'}</Text>
                                    </View>
                                </View>
                                {item?.Product?.map((product, pIndex) => {
                                return <View key={'product'+pIndex} style={styles.tableRow}>
                                    <View style={{ borderWidth: 0, padding: 7, flex: 1, textAlign: 'left',}}>
                                        <Text style={{ fontSize: 16, fontFamily: 'ThaiFont', }}>{product?.Product_Name || '-'}</Text>
                                    </View>
                                    <View style={{ borderWidth: 0, padding: 7, flex: 1, textAlign: 'center',}}>
                                        <Text style={{ fontSize: 16, fontFamily: 'ThaiFont', }}>{product?.Product_Type_Name || '-'}</Text>
                                    </View>
                                    <View style={{ borderWidth: 0, padding: 7, flex: 1, textAlign: 'center',}}>
                                        <Text style={{ fontSize: 16, fontFamily: 'ThaiFont', }}>{product?.Product_Price.toFixed(2) || '0.00'}</Text>
                                    </View>
                                    <View style={{ borderWidth: 0, padding: 7, flex: 1, textAlign: 'right',}}>
                                        <Text style={{ fontSize: 16, fontFamily: 'ThaiFont', }}></Text>
                                    </View>
                                    <View style={{ borderWidth: 0, padding: 7, flex: 1, textAlign: 'right',}}>
                                        <Text style={{ fontSize: 16, fontFamily: 'ThaiFont', }}></Text>
                                    </View>
                                    <View style={{ borderWidth: 0, padding: 7, flex: 1, textAlign: 'right',}}>
                                        <Text style={{ fontSize: 16, fontFamily: 'ThaiFont', }}></Text>
                                    </View>
                                </View>
                                })}
                                </React.Fragment>
                            })}
                            <View style={styles.tableRowTH}>
                                <View style={{ borderWidth: 0, padding: 7, flex: 1, textAlign: 'left',}}>
                                    <Text style={{ fontSize: 16, fontFamily: 'ThaiFont', }}></Text>
                                </View>
                                <View style={{ borderWidth: 0, padding: 7, flex: 1, textAlign: 'left',}}>
                                    <Text style={{ fontSize: 16, fontFamily: 'ThaiFont', }}></Text>
                                </View>
                                <View style={{ borderWidth: 0, padding: 7, flex: 1, textAlign: 'center',}}>
                                    <Text style={{ fontSize: 16, fontFamily: 'ThaiFont', }}></Text>
                                </View>
                                <View style={{ borderWidth: 0, padding: 7, flex: 1, textAlign: 'right',}}>
                                    <Text style={{ fontSize: 15, fontFamily: 'ThaiFontBold' }}>Total Revenue:</Text>
                                </View>
                                <View style={{ borderWidth: 0, padding: 7, flex: 1, textAlign: 'right',}}>
                                    <Text style={{ fontSize: 15, fontFamily: 'ThaiFontBold' }}>{total.toFixed(2) || '0.00'} Baht</Text>
                                </View>
                            </View>
                        </View>
                        </View>
                    </Page>
                </Document>
            </PDFViewer>
        </div>
    )
}

export default page