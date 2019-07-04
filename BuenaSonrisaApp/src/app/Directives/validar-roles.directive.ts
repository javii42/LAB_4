import { Directive, Input, ElementRef, TemplateRef, ViewContainerRef, OnInit } from '@angular/core';

@Directive({
  selector: '[appValidarRoles]'
})
export class ValidarRolesDirective implements OnInit {

  private rolesAdmitidos: string[];

  @Input() set appValidarRoles(value: string[]) {
    this.rolesAdmitidos = value;
  }

  constructor(
    private element: ElementRef,
    private templateRef: TemplateRef<any>,
    private viewContainer: ViewContainerRef) {
  }

  ngOnInit() {
    if (this.CheckRoles()) {
      this.viewContainer.createEmbeddedView(this.templateRef);
    } else {
      this.viewContainer.clear();
    }
  }

  private CheckRoles(): Boolean {
    let retorno: Boolean = false;
    const token = localStorage.getItem('token');
    const tokenInfo = JSON.parse(token);

    if (this.rolesAdmitidos && tokenInfo) {
      const tipoUsuario = tokenInfo['tipo'];
      this.rolesAdmitidos.forEach(element => {
        if (tipoUsuario === element) {
          retorno = true;
        }
      });
    }

    return retorno;
  }

}