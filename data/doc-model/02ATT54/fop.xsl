<?xml version="1.0" encoding="utf-8"?>
<xsl:stylesheet version="1.0"
      xmlns:xsl="http://www.w3.org/1999/XSL/Transform"
      xmlns:fo="http://www.w3.org/1999/XSL/Format"
      xmlns:date="http://exslt.org/dates-and-times">
  <xsl:output method="xml" indent="yes"/>
  <xsl:template match="/">
	<fo:root>
      <!-- Add comment-->
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
             <xsl:for-each select="document/personne">
               <fo:block-container border="medium solid black" width="13.5cm" top="6.5cm" left="1cm" position="absolute">
                 <fo:block text-align="center" font-size="12pt" margin-top="0.2cm" margin-bottom="0.1cm">
                   ATTESTATION D'ENTREE EN FORMATION
                 </fo:block>
               </fo:block-container>
               <fo:block-container width="13.5cm" top="8.5cm" left="1cm" position="absolute" font-size="10pt">
                 <fo:block>
                   Je soussigné(e), <xsl:value-of select="/document/afpa/responsable"/>
                 </fo:block>
                 <fo:block>
                   du <xsl:value-of select="/document/afpa/denomination/ligne2"/>
                 </fo:block>
               </fo:block-container>
               <fo:block-container width="13.5cm" top="10cm" left="1cm" position="absolute" font-size="10pt">
                 <fo:block>
                   Certifie que : 
                  <fo:inline>
                      <xsl:value-of select="civilite"/> 
                  </fo:inline> 
                  <xsl:text>&#160;</xsl:text>
                  <fo:inline>
                      <xsl:value-of select="prenom"/> 
                  </fo:inline> 
                  <xsl:text>&#160;</xsl:text>
                  <fo:inline>
                      <xsl:value-of select="nom"/> 
                  </fo:inline>                  
                 </fo:block>
               </fo:block-container> 
               <fo:block-container width="13.5cm" top="11cm" left="1cm" position="absolute" font-size="10pt">
                <fo:block>
                  Né (e) le : 
                  <xsl:value-of select="date-de-naissance"/> 
                </fo:block>               
               </fo:block-container>
               <fo:block-container width="13.5cm" top="12cm" left="1cm" position="absolute" font-size="10pt">
                 <fo:block>
                   demeurant : 
                 </fo:block>
                 <fo:block-container width="6cm" left="3.5cm" position="absolute">
                   <fo:block>   
                     <xsl:value-of select="adresse/ligne1"/> 
                   </fo:block>  
                   <fo:block>   
                     <xsl:value-of select="adresse/ligne2"/> 
                   </fo:block>                   
                 </fo:block-container>
                 <fo:block-container width="6cm" top="1.3cm" left="3.5cm" position="absolute">
                   <fo:block>   
                     <xsl:value-of select="adresse/code-postal"/>
                     <xsl:text>&#160;</xsl:text>
                     <xsl:value-of select="adresse/ville"/>
                   </fo:block>                   
                 </fo:block-container>                
               </fo:block-container>
               <fo:block-container width="13.5cm" top="14.7cm" left="1cm" position="absolute" font-size="10pt">
                <fo:block>
                  Est entré(e) en formation de : 
                  <xsl:value-of select="formation"/> 
                </fo:block>               
               </fo:block-container>
               <fo:block-container width="13.5cm" top="15.7cm" left="1cm" position="absolute" font-size="10pt">
                <fo:block>
                  au centre de 
                  <xsl:value-of select="/document/afpa/adresse/ville"/> 
                </fo:block>               
               </fo:block-container>                          
               <fo:block-container width="13.5cm" top="17cm" left="1cm" position="absolute" font-size="10pt">
                <fo:block>
                  depuis le : 
                  <xsl:value-of select="date-entree"/> 
                </fo:block>               
               </fo:block-container>
               <fo:block-container width="13.5cm" top="18cm" left="1cm" position="absolute" font-size="10pt">
                <fo:block>
                  La formation se terminera le : 
                  <xsl:value-of select="date-fin"/> 
                </fo:block>               
               </fo:block-container>
               <fo:block-container width="13.5cm" top="19cm" left="1cm" position="absolute" font-size="10pt">
                <fo:block>
                  Pour faire valoir ce que de droit, 
                </fo:block>               
               </fo:block-container>                          
               <fo:block-container width="13.5cm" top="20cm" left="1cm" position="absolute" font-size="10pt">
                <fo:block>
                  Fait à
                  <xsl:text>&#160;</xsl:text>
                  <xsl:value-of select="/document/afpa/adresse/ville"/>
                  , le 
                  <xsl:variable name="now" select="date:date-time()"/>
                  <xsl:value-of select="date:day-in-month($now)"/>
                  <xsl:text>/</xsl:text>
                  <xsl:value-of select="date:month-in-year($now)"/>
                  <xsl:text>/</xsl:text>
                  <xsl:value-of select="date:year($now)"/>
                </fo:block>               
               </fo:block-container>
              <fo:block-container width="5cm" top="22cm" left="10cm" position="absolute" font-size="10pt">
                <fo:block>
                  <xsl:value-of select="/document/afpa/responsable"/>
                </fo:block>
                <fo:block>
                  Directrice
                </fo:block>                             
               </fo:block-container>
               <fo:block-container width="5cm" top="23.8cm" left="12.5cm" position="absolute">
                <fo:block>
                  <fo:external-graphic content-width="scale-to-fit" width="35%" height="35%" src="../images/Rhone-Alpes.jpg"/>
                </fo:block>
               </fo:block-container>
               <fo:block-container width="5cm" top="23.5cm" left="15cm" position="absolute">
                <fo:block>
                  <fo:external-graphic content-width="scale-to-fit" width="35%" height="35%" src="../images/Europe.png"/>
                </fo:block>
               </fo:block-container>
               <fo:block break-after="page"/>
	        </xsl:for-each>
          </fo:flow>         
        </fo:page-sequence>
    </fo:root>
  </xsl:template>
</xsl:stylesheet>