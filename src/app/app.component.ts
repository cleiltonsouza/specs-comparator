import { HttpClient } from '@angular/common/http';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import SwaggerUI from 'swagger-ui'
import { SwaggerUIBundle, SwaggerUIStandalonePreset } from 'swagger-ui-dist'
import { lastValueFrom } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
})
export class AppComponent implements OnInit {
  title = 'specs-comparator';
  @ViewChild('left_swagger_ui') leftSwaggerViewContainer!: ElementRef
  @ViewChild('right_swagger_ui') rightSwaggerViewContainer!: ElementRef

  openFinanceApis: any[] = []
  openInsuranceApis: { name: string, url: string }[] = []
  opinSelectedAPI: any
  opfSelectedAPI: any

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    this.getOpenFinanceSpecs()
    this.getOpenInsuranceSpecs()
  }

  async getOpenInsuranceSpecs() {
    const data = await lastValueFrom(this.http.get<any[]>("https://api.github.com/repos/br-openinsurance/areadesenvolvedor/contents/documentation/source/files/swagger"))

    data.forEach(element => {
      this.openInsuranceApis.push({ name: element.name, url: element.download_url })
    });
  }

  async getOpenFinanceSpecs() {

    var apiNames: string[] = []

    const data = await lastValueFrom(this.http.get<any[]>("https://api.github.com/repos/Openbanking-brasil/openapi/contents/swagger-apis"))

    data.forEach(element => {
      apiNames.push(element.name)
    });
    await this.getOpenFinanceSpecsUrls(apiNames)
  }

  async getOpenFinanceSpecsUrls(apiNames: string[]) {

    for (const name of apiNames) {
      const data = await lastValueFrom(this.http.get<any[]>(`https://api.github.com/repos/Openbanking-brasil/openapi/contents/swagger-apis/${name}`))

      var apiVersions: any[] = []
      data.forEach(element => {
        apiVersions.push({ name: element.name, url: element.download_url })
      });

      apiVersions = apiVersions.filter(value => value.url.slice(-4) != "html")

      this.openFinanceApis.push({ apiName: name, specs: apiVersions })
    }
  }


  loadRightSwaggerView(value: any) {
    console.log("the value is", value.target.value)
    console.log(this.opinSelectedAPI)

    SwaggerUI({
      domNode: this.rightSwaggerViewContainer?.nativeElement,
      presets: [SwaggerUIBundle['presets'].apis, SwaggerUIStandalonePreset],
      layout: "StandaloneLayout",
      url: this.opinSelectedAPI.url
    })
  }

  loadLeftSwaggerView() {
    SwaggerUI({
      domNode: this.leftSwaggerViewContainer?.nativeElement,
      presets: [SwaggerUIBundle['presets'].apis, SwaggerUIStandalonePreset],
      layout: "StandaloneLayout",
      urls: this.opfSelectedAPI.specs
    })
  }
}
