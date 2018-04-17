import { Http } from '@angular/http';
import { Component, OnInit, AfterViewInit, OnDestroy, ViewChildren, ElementRef } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, FormArray, Validators, FormControlName } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/observable/fromEvent';
import 'rxjs/add/observable/merge';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';

import { IProduct } from '../models/product';
import { ProductService } from './product.service';

import { NumberValidators } from '../shared/number.validator';
import { GenericValidator } from '../shared/generic-validator';

import { listStates, listUF } from '../shared/variables';

@Component({
  templateUrl: './product-edit.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductEditComponent implements OnInit, AfterViewInit, OnDestroy {
  @ViewChildren(FormControlName, { read: ElementRef }) formInputElements: ElementRef[];

  pageTitle: string = 'Editar Produto';
  errorMessage: string;
  productForm: FormGroup;

  product: IProduct;
  private sub: Subscription;

  displayMessage: { [key: string]: string } = {};
  private validationMessages: { [key: string]: { [key: string]: string } };
  private genericValidator: GenericValidator;

  public listUF = listUF;
  public listStates = listStates;

  get tags(): FormArray {
    return <FormArray>this.productForm.get('tags');
  }

  constructor(private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private productService: ProductService,
    private http: Http) {

    this.validationMessages = {
      productName: {
        required: 'Campo obrigatório.',
        minlength: 'Nome do produto deve conter ao menos 3 caracteres.',
        maxlength: 'Nome do produto não pode exceder ,ais de 50 caracteres.'
      },
      productCode: {
        required: 'Campo obrigatório.'
      },
      starRating: {
        range: 'Avaliação do produto deve ser entre 1 (menor) e 5 (maior).'
      },
      price: {
        required: 'Campo obrigatório.'
      },
      zip: {
        'required': 'Por favor, insira o cep.',
      },
      uf: {
        'required': 'Por favor, insira seu o uf.',
      },
      city: {
        'required': 'Por favor, insira seu a cidade',
      },
      street: {
        'required': 'Por favor, insira a rua.',
      },
      neighborhood: {
        'required': 'Por favor, insira o bairro',
      }
    };

    this.genericValidator = new GenericValidator(this.validationMessages);
  }

  ngOnInit(): void {
    this.productForm = this.fb.group({
      productName: ['', [Validators.required,
      Validators.minLength(3),
      Validators.maxLength(50)]],
      productCode: ['', Validators.required],
      starRating: ['', NumberValidators.range(1, 5)],
      price: ['', Validators.required],
      uf: ['', Validators.required],
      city: ['', Validators.required],
      street: ['', Validators.required],
      number: [''],
      neighborhood: ['', Validators.required],
      complement: '',
      zip: ['', Validators.required],
      tags: this.fb.array([]),
      description: ''
    });

    this.sub = this.route.params.subscribe(
      params => {
        let id = +params['id'];
        this.getProduct(id);
      }
    );
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }

  ngAfterViewInit(): void {
    let controlBlurs: Observable<any>[] = this.formInputElements
      .map((formControl: ElementRef) => Observable.fromEvent(formControl.nativeElement, 'blur'));

    Observable.merge(this.productForm.valueChanges, ...controlBlurs).debounceTime(800).subscribe(value => {
      this.displayMessage = this.genericValidator.processMessages(this.productForm);
    });
  }

  addTag(): void {
    this.tags.push(new FormControl());
  }

  deleteTag(index: number): void {
    this.tags.removeAt(index);
    this.productForm.setControl('tags', this.fb.array(this.tags.value || []));
  }

  getProduct(id: number): void {
    this.productService.getProduct(id)
      .subscribe(
      (product: IProduct) => this.onProductRetrieved(product),
      (error: any) => this.errorMessage = <any>error
      );
  }

  onProductRetrieved(product: IProduct): void {
    if (this.productForm) {
      this.productForm.reset();
    }
    this.product = product;

    if (this.product.id === 0) {
      this.pageTitle = 'Inserir Produto';
    } else {
      this.pageTitle = `Editar Produto: ${this.product.productName}`;
    }

    this.productForm.patchValue({
      productName: this.product.productName,
      productCode: this.product.productCode,
      starRating: this.product.starRating,
      price: this.product.price,
      street: this.product.street,
      zip: this.product.zip,
      number: this.product.number,
      complement: this.product.complement,
      neighborhood: this.product.neighborhood,
      city: this.product.city,
      uf: this.product.uf,
      description: this.product.description
    });
    this.productForm.setControl('tags', this.fb.array(this.product.tags || []));
  }

  deleteProduct(): void {
    if (this.product.id === 0) {
      this.onSaveComplete();
    } else {
      if (confirm(`Deseja realmente remover o produto: ${this.product.productName}?`)) {
        this.productService.deleteProduct(this.product.id)
          .subscribe(
          () => this.onSaveComplete(),
          (error: any) => this.errorMessage = <any>error
          );
      }
    }
  }

  saveProduct(): void {
    if (this.productForm.dirty && this.productForm.valid) {
      let p = Object.assign({}, this.product, this.productForm.value);

      this.productService.saveProduct(p)
        .subscribe(
        () => this.onSaveComplete(),
        (error: any) => this.errorMessage = <any>error
        );
    } else if (!this.productForm.dirty) {
      this.onSaveComplete();
    }
  }

  onSaveComplete(): void {
    this.productForm.reset();
    this.router.navigate(['/products']);
  }


}
