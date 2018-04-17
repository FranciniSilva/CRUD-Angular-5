import { InMemoryDbService } from 'angular-in-memory-web-api';

import { IProduct } from '../models/product';

export class ProductData implements InMemoryDbService {

    createDb() {
        let products: IProduct[] = [
            {
                'id': 1,
                'productName': 'Ancinho de Jardim',
                'productCode': 'GDN-0011',
                'releaseDate': 'Março 19, 2018',
                'description': 'Vassoura Para Grama E Jardim Com Cabo',
                'price': 27.00,
                'street': 'Rua Paulo Bourroul',
                'zip': '05686050',
                'number': '310',
                'complement': 'Bloco 01',
                'neighborhood': 'Real Parque',
                'city': 'São Paulo',
                'uf': 'SP',
                'starRating': 3.2,
                'imageUrl': 'http://openclipart.org/image/300px/svg_to_png/26215/Anonymous_Leaf_Rake.png',
                'tags': ['ancinho', 'folha', 'jardim', 'casa']
            },
            {
                'id': 2,
                'productName': 'Carrinho de Jardim',
                'productCode': 'GDN-0023',
                'releaseDate': 'Março 18, 2018',
                'description': 'Carrinho Floreira Para Jardim Modelo Viena Alumínio, Ouro envelhecido , Comp;76cm / altura; 35cm / largura ; 33cm',
                'price': 279.90,
                'street': 'Rua Paulo Bourroul',
                'zip': '05686050',
                'number': '310',
                'complement': 'Bloco 01',
                'neighborhood': 'Real Parque',
                'city': 'São Paulo',
                'uf': 'SP',
                'starRating': 4.2,
                'imageUrl': 'http://openclipart.org/image/300px/svg_to_png/58471/garden_cart.png'
            },
            {
                'id': 5,
                'productName': 'Martelo',
                'productCode': 'TBX-0048',
                'releaseDate': 'Maio 21, 2018',
                'description': 'Martelo de Unha de 27mm com Cabo de Madeira - FORTGPRO-FG8630',
                'price': 8.9,
                'street': 'Rua Paulo Bourroul',
                'zip': '05686050',
                'number': '310',
                'complement': 'Bloco 01',
                'neighborhood': 'Real Parque',
                'city': 'São Paulo',
                'uf': 'SP',
                'starRating': 4.8,
                'imageUrl': 'http://openclipart.org/image/300px/svg_to_png/73/rejon_Hammer.png',
                'tags': ['ferramenta', 'martelo', 'contrução']
            },
            {
                'id': 8,
                'productName': 'Serrote',
                'productCode': 'TBX-0022',
                'releaseDate': 'Maio 15, 2018',
                'description': 'Serrote com lâmina de 22"',
                'price': 39.88,
                'street': 'Rua Paulo Bourroul',
                'zip': '05686050',
                'number': '310',
                'complement': 'Bloco 01',
                'neighborhood': 'Real Parque',
                'city': 'São Paulo',
                'uf': 'SP',
                'starRating': 3.7,
                'imageUrl': 'http://openclipart.org/image/300px/svg_to_png/27070/egore911_saw.png'
            },
            {
                'id': 10,
                'productName': 'Controle de Video Game',
                'productCode': 'GMG-0042',
                'releaseDate': 'Outubro 15, 2017',
                'description': 'Controle Video Game 360 Wireless 100% Original',
                'price': 179.99,
                'street': 'Rua Paulo Bourroul',
                'zip': '05686050',
                'number': '310',
                'complement': 'Bloco 01',
                'neighborhood': 'Real Parque',
                'city': 'São Paulo',
                'uf': 'SP',
                'starRating': 4.6,
                'imageUrl': 'http://openclipart.org/image/300px/svg_to_png/120337/xbox-controller_01.png'
            }
        ];
        return { products };
    }
}
