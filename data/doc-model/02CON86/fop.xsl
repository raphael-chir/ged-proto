<?xml version="1.0" encoding="utf-8"?>
<xsl:stylesheet version="1.0"
      xmlns:xsl="http://www.w3.org/1999/XSL/Transform"
      xmlns:fo="http://www.w3.org/1999/XSL/Format"
      xmlns:date="http://exslt.org/dates-and-times">
  <xsl:output method="xml" indent="yes"/>
  <xsl:template match="/">
	<fo:root>
		<fo:layout-master-set>
        	<fo:simple-page-master master-name="A4-portrait"
              page-height="29.7cm" page-width="21.0cm" margin-left="2cm" margin-top="1cm" margin-bottom="1cm">
         		<fo:region-body/>
              	<fo:region-before/>
              <fo:region-after/>
        	</fo:simple-page-master>
      	</fo:layout-master-set>
      	<fo:page-sequence master-reference="A4-portrait">
           	<!-- header -->
    		<fo:static-content flow-name="xsl-region-before">
              <fo:block-container width="4cm" top="0cm" left="13cm" position="absolute">
                <fo:block>
                  <fo:external-graphic content-width="scale-to-fit" width="4cm" height="4cm" src="../images/logo-afpa.jpg"/>
                </fo:block>
              </fo:block-container>
              <fo:block-container font-size="10pt" width="10cm" top="0cm" left="0cm" position="absolute">
              	<fo:block>
					<fo:external-graphic content-width="scale-to-fit" width="0.4cm" height="0.19cm" src="../images/section.png"/>
               	</fo:block>
                <fo:block  margin-bottom="0.5cm">
                  <fo:block>
                    <xsl:value-of select="document/afpa/denomination/ligne1"/>
                  </fo:block>                  
                  <fo:block>                    
                    <xsl:value-of select="document/afpa/denomination/ligne2"/>
                  </fo:block>
                </fo:block>
				<fo:block>
                  <fo:block>
                    <xsl:value-of select="document/afpa/adresse/ligne1"/>
                  </fo:block>
                  <fo:block>
                    <xsl:value-of select="document/afpa/adresse/ligne2"/>
                  </fo:block>
                  <fo:block>
                    <xsl:value-of select="document/afpa/adresse/ligne3"/>
                  </fo:block>
                  <fo:block>
                    <xsl:value-of select="document/afpa/adresse/code-postal"/>
                    <xsl:text>&#160;</xsl:text>
                    <xsl:value-of select="document/afpa/adresse/ville"/>
                  </fo:block>
                  <fo:block>
                    Tel. : <xsl:value-of select="document/afpa/telephone"/>
                  </fo:block>
                  <fo:block>
                    Fax : <xsl:value-of select="document/afpa/fax"/>
                  </fo:block>
                  <fo:block>
                    <fo:basic-link external-destination="normal.pdf" color="#1F386C" text-decoration="underline">
                      <xsl:value-of select="document/afpa/site-url"/>
                     </fo:basic-link>
                  </fo:block>
                  <fo:block>
                      <fo:external-graphic content-width="scale-to-fit" width="0.4cm" height="0.19cm" src="../images/section.png"/>
                  </fo:block>                 
                </fo:block>
              </fo:block-container>              
    		</fo:static-content>
 			<!-- Footer -->
    		<fo:static-content flow-name="xsl-region-after">
              <fo:block-container font-size="10pt" width="100%" top="-1cm" left="0cm" position="absolute">
                <fo:block>
                  <fo:external-graphic content-width="scale-to-fit" width="0.4cm" height="0.19cm" src="../images/section.png"/>
                 </fo:block>
                 <fo:block>
                   Association nationale pour la formation professionnelle des adultes
                  </fo:block> 
                </fo:block-container>
             </fo:static-content>          
           <fo:flow flow-name="xsl-region-body">
               <fo:block>
                   Association nationale pour la formation professionnelle des adultes
               </fo:block>
           </fo:flow>
        </fo:page-sequence>
    </fo:root>
  </xsl:template>
</xsl:stylesheet>