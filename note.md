description for whatever social media
title on google might be wrong
do google maps thing
check 301 - 200 - 307 requests on network
refactor components in html
facebook: no metadata
form, when i scroll down, the footer is not stable

for small screen with low height, we cannot see the button continue

improvement:
Make a 100% done in the download process?


SEO
├── Metadata
│   ├── title
│   ├── description
│   ├── canonical URL
│   └── Open Graph / Twitter metadata
│
├── Structured data (Schema.org)
│   ├── LocalBusiness
│   ├── Service
│   ├── WebSite
│   └── WebPage
│
└── Technical SEO
    ├── robots.txt
    ├── sitemap.xml
    └── Crawlability / indexability


Now i want to update my services section.

1) dictionary
i want first to update my field names in dictionaries/pages/services.ts:
- from cuttingServices to serviceOne
- from services to serviceTwo
- from quotesAreBasedOn to serviceThree
- from deliveryOptions to serviceFour

on each service, i want to change the heading:
- ServiceOne: from "Project Size" to CAD Design (CAD design in german)
- serviceTwo: from  "Services" to CNC Machining (CNC Leistungen in german)
- serviceThree: Materials (Materialien in german)
- serviceFour: from "quotes are based on" on to "quotes based on" (Angebote basieren auf in german)
- serviceFive: from "Delivery Options" to Delivery (Lieferung in german)

2) card header

I want to update the images:
- ServiceOne:
in english: change to /service/cad-design.svg
in german: change to /service/cad-design.svg

- serviceTwo:
in english: change to /service/cnc-machining.svg
in german: change to /service/cnc-leistungen.svg

- serviceThree:
in english: change to /service/materials.svg
in german: change to /service/materialen.svg

- serviceFour: 
in english: change to /service/quotes.svg
in german: lets keep /service/angebot-basieren-auf.svg

- serviceFive: 
in english: change to /service/delivery.svg
in german: change to /service/lieferung.svg


and then delete the images:
- /service/services.svg
- /service/project_size.svg
- /service/quotes-are-based-on.svg
- /service/delivery-options.svg

- /service/leistungen.svg
- /service/projektumfang.svg
- /service/lieferoptionen.svg
