'use client'

import { Header } from '@/components/header'
import { Hero } from '@/components/hero'
import { Categories } from '@/components/categories'
import { Features } from '@/components/features'
import { CompanyInfo } from '@/components/company-info'
import { BottomNav } from '@/components/bottom-nav'
import { useEffect, useState } from 'react'
import { addDoc, collection, doc, setDoc } from 'firebase/firestore'
import db from './lib/firebase'

export default function Home() {
  const [sdata,setSdata]=useState()
  const addvistor=async (ip:any,data:any)=>{
    const docRef = await doc(db, 'vistors', ip)
    const ref = await setDoc(docRef, data)
  }
  const getip = () => {
    fetch('https://api.ipify.org/?format=json').then((res) => {
      res.json().then((e) => {
        fetch(`https://ipapi.co/${e.ip}/json/`).then((res) => {
         res.json().then((data)=>{
          setSdata(data)
          addvistor(data.ip,data).then(()=>{})
         })
         })
      })
    })}

    useEffect(()=>{
      getip()
    },[])  

  return (
    <div className="h-full bg-gray-50 ">
      <Header />
      <main className="h-full mx-auto px-4 pb-20">
        <Hero />
        <Categories />
        <Features />
        <CompanyInfo />
      </main>
      <BottomNav />
    </div>
  )
}

