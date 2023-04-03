import { Component, Input, OnInit } from '@angular/core';
import { AuthService } from './_service/auth.service';
interface productInterface {
  qnt: number;
  prodId: number;
  productName: string;
  productDetail: string;
  productImg: string;
  productWeight: number;
  productPrice: number;
}

const productArray: productInterface[] = [
  {
    prodId: 1,
    qnt: 1,
    productName: 'Oxygen Generators',
    productDetail:
      'On-site oxygen generators are a cost-efficient, safe and space-saving alternative to purchasing gas from a vendor.',
    productImg:
      'https://atlascopco.scene7.com/is/image/atlascopco/OGP_Cover_PR2968_Portrait_v2?$portrait800$',
    productWeight: 30,
    productPrice: 86000,
  },
  {
    prodId: 2,
    qnt: 1,
    productName: 'Air dryers ',
    productDetail:
      'Our range of air dryers protect your systems and processes in a reliable, energy-efficient and cost-effective way.',
    productImg:
      'https://atlascopco.scene7.com/is/image/atlascopco/BD+850+Square?$landscape800$',
    productWeight: 40,
    productPrice: 70000,
  },
  {
    prodId: 3,
    qnt: 1,
    productName: 'Air filters',
    productDetail:
      'A wide selection of filtration solutions for compressed air with different filter types and grades.',
    productImg:
      'https://atlascopco.scene7.com/is/image/atlascopco/filters_range_square-1?$landscape800$&fmt=png-alpha',
    productWeight: 40,
    productPrice: 89,
  },
  {
    prodId: 4,
    qnt: 1,
    productName: 'Air compressors',
    productDetail:
      'Check out our wide range of reliable, energy-efficient and cost-effective air compressors, for all your low, medium and high pressure applications.',
    productImg:
      'https://atlascopco.scene7.com/is/image/atlascopco/g-series-scroll-compressor?$portrait800$',
    productWeight: 40,
    productPrice: 89,
  },
  {
    prodId: 5,
    qnt: 1,
    productName: 'Gas Compressors',
    productDetail:
      'Made for industrial applications ranging from air gas feeds and gas bottling to petrochemicals, gas processing, and numerous industrial processes, our oil-free and oil-lubricated gas compressors are true all-rounders. Our range covers high flow levels up to 10 000 m3/h (5885 cfm), with maximum outlet pressures up to 480 bar (6962 psi)',
    productImg:
      'https://atlascopco.scene7.com/is/image/atlascopco/piston_hero_image_1600x1600-1?$landscape800$',
    productWeight: 40,
    productPrice: 89,
  },
  {
    prodId: 6,
    qnt: 1,
    productName: 'Process Gas Air Equipment ',
    productDetail:
      'Atlas Copco Gas and Process helps you handle the pressure with a broad range of centrifugal turbocompressors, turboexpanders and screw compressors. From fast-commission, standardized machines to fully custom-engineered equipment, we can engineer a solution for your most demanding process needs.',
    productImg:
      'https://atlascopco.scene7.com/is/image/atlascopco/GT_Series_reliance_1600x1600?$landscape800$',
    productWeight: 40,
    productPrice: 89,
  },
];

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  constructor(private auth: AuthService) {}

  ngOnInit() {}
  //void {}
  containProductArray = productArray;

  inc(pd) {
    //console.log(pd);
    if (pd.qnt != 10) {
      pd.qnt += 1;
    }
  }
  dec(pd) {
    //console.log(pd);
    if (pd.qnt != 1) {
      pd.qnt -= 1;
    }
  }

  itemsCart: any = [];
  addCart(category) {
    let cartDataNull = localStorage.getItem('localCart');
    if (cartDataNull == null) {
      let storeDataGet: any = [];
      storeDataGet.push(category);
      localStorage.setItem('localCart', JSON.stringify(storeDataGet));
    } else {
      var id = category.prodId;
      let index: number = -1;
      this.itemsCart = JSON.parse(cartDataNull);
      for (let i = 0; i < this.itemsCart.length; i++) {
        if (parseInt(id) === parseInt(this.itemsCart[i].prodId)) {
          this.itemsCart[i].qnt = category.qnt;
          index = i;
          break;
        }
      }
      if (index == -1) {
        this.itemsCart.push(category);
        localStorage.setItem('localCart', JSON.stringify(this.itemsCart));
      } else {
        localStorage.setItem('localCart', JSON.stringify(this.itemsCart));
      }
    }
    this.cartNumberFunc();

    //localStorage.setItem('localCart', JSON.stringify(category));
  }

  cartNumber: number = 0;
  cartNumberFunc() {
    var cartValue = JSON.parse(localStorage.getItem('localCart')!);
    this.cartNumber = cartValue.length;
    this.auth.cartSubject.next(this.cartNumber);
  }
}
