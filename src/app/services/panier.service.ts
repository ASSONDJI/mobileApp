import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

export interface Support {
  id: number;
  nom: string;
  image: string;
  prix: number;
}

export interface ProduitPanier {
  id: number;
  nom: string;
  image: string;
  quantite: number;
  prixUnitaire: number;
  total: number;
}

@Injectable({
  providedIn: 'root'
})
export class PanierService {
  private panierSubject = new BehaviorSubject<ProduitPanier[]>(this.loadPanier());

  panier$ = this.panierSubject.asObservable();

  private loadPanier(): ProduitPanier[] {
    const data = localStorage.getItem('panier');
    return data ? JSON.parse(data) : [];
  }

  private savePanier(panier: ProduitPanier[]) {
    localStorage.setItem('panier', JSON.stringify(panier));
  }

  getPanier(): ProduitPanier[] {
    return this.panierSubject.getValue();
  }

  ajouterProduit(support: Support, quantite: number = 1) {
    const panier = this.getPanier();
    const index = panier.findIndex(p => p.id === support.id);
    if (index > -1) {
      panier[index].quantite += quantite;
      panier[index].total = panier[index].quantite * panier[index].prixUnitaire;
    } else {
      panier.push({
        id: support.id,
        nom: support.nom,
        image: support.image,
        quantite,
        prixUnitaire: support.prix,
        total: quantite * support.prix
      });
    }
    this.savePanier(panier);
    this.panierSubject.next(panier);
  }

  retirerProduit(id: number, quantite: number = 1) {
    let panier = this.getPanier();
    const index = panier.findIndex(p => p.id === id);
    if (index > -1) {
      panier[index].quantite -= quantite;
      if (panier[index].quantite <= 0) {
        panier.splice(index, 1);
      } else {
        panier[index].total = panier[index].quantite * panier[index].prixUnitaire;
      }
      this.savePanier(panier);
      this.panierSubject.next(panier);
    }
  }

  supprimerProduit(id: number) {
    let panier = this.getPanier();
    panier = panier.filter(p => p.id !== id);
    this.savePanier(panier);
    this.panierSubject.next(panier);
  }

  viderPanier() {
    this.savePanier([]);
    this.panierSubject.next([]);
  }
}
