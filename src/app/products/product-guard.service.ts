import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, CanDeactivate } from '@angular/router';

import { ProductEditComponent } from './product-edit.component';

@Injectable()
export class ProductDetailGuard implements CanActivate {

    constructor(private router: Router) {
    }

    canActivate(route: ActivatedRouteSnapshot): boolean {
        let id = +route.url[1].path;
        if (isNaN(id) || id < 1) {
            alert('Produto de id inválido');

            this.router.navigate(['/products']);

            return false;
        };
        return true;
    }
}

@Injectable()
export class ProductEditGuard implements CanDeactivate<ProductEditComponent> {

    canDeactivate(component: ProductEditComponent): boolean {
        if (component.productForm.dirty) {
            let productName = component.productForm.get('productName').value || 'Inserir Produto';
            return confirm(`Saindo desta página você perderá todas as alterações do produto ${productName}?`);
        }
        return true;
    }
}
