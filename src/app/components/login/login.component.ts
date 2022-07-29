import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Usuarios } from 'src/app/models/usuario.model';
import { UsuariosService } from 'src/app/services/usuarios.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  providers: [UsuariosService],
})
export class LoginComponent implements OnInit {
  public usuariosModel: Usuarios;

  constructor(
    private _usuariosServices: UsuariosService,
    private _router: Router
  ) {
    this.usuariosModel = new Usuarios('', '', '', '', '');
  }

  ngOnInit(): void {}

  getToken() {
    this._usuariosServices.login(this.usuariosModel, 'true').subscribe(
      (response) => {
        console.log(response.token);
        localStorage.setItem('token', response.token);
      },
      (error) => {
        console.log(<any>error);
      }
    );
  }

  login() {
    this._usuariosServices.login(this.usuariosModel).subscribe(
      (response) => {
        this.getToken();
        localStorage.setItem('identidad', JSON.stringify(response.usuario));
        console.log(response);
        if (this._usuariosServices.obtenerIdentidad().rol == 'ROL_USUARIO') {
          this._router.navigate(['usuario/inicio']);
        } else if (
          this._usuariosServices.obtenerIdentidad().rol == 'ROL_ADMIN' ||
          this._usuariosServices.obtenerIdentidad().rol == 'ROL_SUPERADMIN'
        ) {
          this._router.navigate(['admin/inicio']);
        }
      },
      (error) => {
        console.log(<any>error);
      }
    );
  }
}
