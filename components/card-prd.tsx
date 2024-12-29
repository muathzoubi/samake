import Image from 'next/image';
import React from 'react';
import { Card } from './ui/card';
import { Badge } from './ui/badge';

const MerchantCard: React.FC = () => {
  return (
    <Card className="merchant-card-wrapper" style={{ margin: '-11px', borderRadius: '24px 24px 0 0' }}>
      <div className="merchant-card-img-wrapper">
        <div className="merchant-promo-tag-promotion merchant-card-promotion">
          <div className="merchant-promo-tag promo-tag-percentage-off">
            <Badge variant={'destructive'} className="typography-p10">خصم %30</Badge>
          </div>
          <div className="merchant-promo-tag promo-tag-support-local">
            <Badge  variant={'destructive'} className="typography-p10">ادعم المحلي</Badge>
          </div>
        </div>
        <div style={{ position: 'relative', width: '100%', height: '100%' ,marginTop:20}}>
          <Image
          fill
            alt="قائمة أسماك الوطنية"
            src="/asd.jpeg"
            className='object-cover rounded-lg'
          />
        </div>
        <div className="merchant-card-delivery-time ">
         
          <Badge className=" typography-p8 mr-auto">40 دقيقة</Badge>
        </div>
      </div>
      <div className="merchant-card-content">
        <div className="merchant-card-primary-details">
          <p className="typography-p1 merchant-card-name" style={{ fontSize: '25px', height: '35px', padding: '5px 0' }}>
            قائمة أسماك الوطنية
          </p>
        </div>
        <div className="merchant-card-secondary-details">
          <div className="merchant-card-rating">
           <span className='text-sm'>
           ⭐   
           4.72

           </span>
          </div>
          <p className="typography-p8 merchant-card-tags">
          الأسماك الطازجة والمستوردة والروبيان المميز
          </p>
        </div>
      </div>
    </Card>
    
  );
};

export default MerchantCard;
