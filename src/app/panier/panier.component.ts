import { Component, OnInit } from '@angular/core';
import {PanierService} from '../shared/services/panier.service';
import Product from '../shared/model/Product';
import PanierItem from '../shared/model/PanierItem';
import {ɵparseCookieValue} from '@angular/common';
import {UserService} from '../shared/services/user.service';
import User from '../shared/model/User';
import {MatDialog} from '@angular/material';
import {InscriptionComponent} from '../inscription/inscription.component';

@Component({
  selector: 'app-panier',
  templateUrl: './panier.component.html',
  styleUrls: ['./panier.component.scss']
})
export class PanierComponent implements OnInit {
  mySubscription: any;
  total = 0;
  user: string = null;
  panier : Array <PanierItem>;
displayedColumns: string[] = ['img','name', 'price', 'desc', 'qte'];
constructor(private panierService: PanierService, private userService: UserService,public dialog: MatDialog) { }

ngOnInit() {
    this.panier = this.panierService.getAll();
    this.panier.map((c) => this.total += c.product.price * c.qte);
  }
addQte(p: PanierItem) {
    this.panierService.aqte(p);
    this.total = 0;
    this.panier.map((c) => this.total += c.product.price * c.qte);
  }
minQte(p: PanierItem) {
    this.panierService.mqte(p);
    this.total = 0;
    this.panier.map((c) => this.total += c.product.price * c.qte);
  }
  remove(p: PanierItem) {
  this.panierService.remove(p.product);
  this.panier.splice(this.panier.indexOf(this.panier.filter(c => c.product === p.product)[0]), 0 );
  this.dialog.closeAll();
  this.dialog.open(PanierComponent,{
    width:'1000px',
    height:'700px'

  })
  }
commander() {
  const quantity: Array<number> = [];
  const products: Array<string> = [];
  for (const i in this.panier) {
    quantity[i] = this.panier[i].qte;
    products[i] = this.panier[i].product._id;
  }
  const user = this.userService.user();
  const total = this.total;
  const commande = {
    user,
    quantity,
    products,
    total
  };
  this.panierService.command(commande);
  }

}
