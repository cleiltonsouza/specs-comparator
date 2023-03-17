import { HttpClient } from '@angular/common/http';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import SwaggerUI from 'swagger-ui'
import { SwaggerUIBundle, SwaggerUIStandalonePreset } from 'swagger-ui-dist'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
})
export class AppComponent implements OnInit {
  title = 'specs-comparator';
  @ViewChild('left_swagger_ui') leftSwaggerViewContainer!: ElementRef
  @ViewChild('right_swagger_ui') rightSwaggerViewContainer!: ElementRef

  openFinanceApis: { apiName: string, specs: any[] }[] = []
  openInsuranceApis: { name: string, url: string }[] = []
  opinSelectedAPI: any
  opfSelectedAPI: any

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    this.getOpenFinanceSpecs()
    this.getOpenInsuranceSpecs()
  }

  getOpenInsuranceSpecs() {
    this.http.get<any[]>("https://api.github.com/repos/br-openinsurance/areadesenvolvedor/contents/documentation/source/files/swagger").subscribe(data => {
      data.forEach(element => {
        this.openInsuranceApis.push({ name: element.name, url: element.download_url })
      });
    })
  }

  getOpenFinanceSpecs() {
    var apiNames: string[] = []
    this.http.get<any[]>("https://api.github.com/repos/Openbanking-brasil/openapi/contents/swagger-apis").subscribe(data => {
      data.forEach(element => {
        apiNames.push(element.name)
      });
      this.getOpenFinanceSpecsUrls(apiNames)
    })
  }

  getOpenFinanceSpecsUrls(apiNames: string[]) {

    for (const name of apiNames) {
      this.http.get<any[]>(`https://api.github.com/repos/Openbanking-brasil/openapi/contents/swagger-apis/${name}`).subscribe(data => {

        var apiVersions: any[] = []
        data.forEach(element => {
          apiVersions.push({ name: element.name, url: element.download_url })
        });

        apiVersions = apiVersions.filter(value => value.url.slice(-4) != "html")

        this.openFinanceApis.push({ apiName: name, specs: apiVersions })
      })
    }
  }

  loadRightSwaggerView(value: any) {
    SwaggerUI({
      domNode: this.rightSwaggerViewContainer?.nativeElement,
      presets: [SwaggerUIBundle['presets'].apis, SwaggerUIStandalonePreset],
      layout: "StandaloneLayout",
      deepLinking: true,
      url: this.opinSelectedAPI.url
    })
  }

  loadLeftSwaggerView() {
    SwaggerUIBundle({
      domNode: this.leftSwaggerViewContainer?.nativeElement,
      presets: [SwaggerUIBundle['presets'].apis, SwaggerUIStandalonePreset],
      layout: "StandaloneLayout",
      urls: this.opfSelectedAPI.specs,
      deepLinking: true,
      "urls.primaryName": this.opfSelectedAPI.specs.sort().at(-1).name
    })
  }
}
