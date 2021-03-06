import { Component, OnInit } from '@angular/core';
import {RechercheService} from '../shared/services/recherche.service';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from '../shared/services/product.service';

@Component({
  selector: 'app-recherche',
  templateUrl: './recherche.component.html',
  styleUrls: ['./recherche.component.scss']
})
export class RechercheComponent implements OnInit {

  constructor(private productService: ProductService,private route: ActivatedRoute) { }

  ngOnInit() {
    let search = this.route.snapshot.paramMap.get('search');
    this.productService.getSearch(search)
  }

}
