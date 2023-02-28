import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
import SwaggerUI from 'swagger-ui'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  // styleUrls: ['../../node_modules/swagger-ui/dist/swagger-ui.css']
})
export class AppComponent implements AfterViewInit {
  title = 'specs-comparator';
  @ViewChild('left_swagger_ui') leftSwaggerViewContainer!: ElementRef
  @ViewChild('right_swagger_ui') rightSwaggerViewContainer!: ElementRef

  ngAfterViewInit() {

    SwaggerUI({
      domNode: this.leftSwaggerViewContainer?.nativeElement,
      url: 'https://br-openinsurance.github.io/areadesenvolvedor/files/swagger/capitalization-title.yaml'
    })
    SwaggerUI({
      domNode: this.rightSwaggerViewContainer?.nativeElement,
      url: 'https://sensedia.github.io/draft-openapi/swagger-apis/capitalization-bonds/1.0.0-rc1.0.yml'
    })
  }
}
