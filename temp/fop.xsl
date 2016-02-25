<?xml version="1.0" encoding="utf-8"?>
<xsl:stylesheet version="1.0"
      xmlns:xsl="http://www.w3.org/1999/XSL/Transform"
      xmlns:fo="http://www.w3.org/1999/XSL/Format">
  <xsl:output method="xml" indent="yes"/>
  <xsl:template match="/">
    <fo:root>
      <fo:layout-master-set>
        <fo:simple-page-master master-name="A4-portrait"
              page-height="29.7cm" page-width="21.0cm" margin="2cm">
          <fo:region-body/>
        </fo:simple-page-master>
      </fo:layout-master-set>
      <fo:page-sequence master-reference="A4-portrait">
        <fo:flow flow-name="xsl-region-body">
          <fo:table table-layout="fixed" width="100%">
        	<fo:table-column column-width="proportional-column-width(1)"/>
        	<fo:table-column column-width="50mm"/>
        	<fo:table-column column-width="40mm"/>
        	<fo:table-body>
          		<fo:table-row>
                  	<fo:table-cell column-number="1">
                      <fo:block>AFPA LEVALLOIS</fo:block>
                      <fo:block>CENTRE DE BOURG EN BRESSE</fo:block>
                      <fo:block><xsl:value-of select="document/afpa/denomination"/></fo:block>
                      <fo:block><xsl:value-of select="document/afpa/adresse/ligne1"/></fo:block>
                      <fo:block><xsl:value-of select="document/afpa/adresse/ligne2"/></fo:block>
                      <fo:block>
                        <fo:inline>
                          <xsl:value-of select="document/afpa/adresse/code-postal"/> 
                        </fo:inline> 
                        <xsl:text>&#160;</xsl:text>
                        <fo:inline>  
                          <xsl:value-of select="document/afpa/adresse/ville"/>
                      	</fo:inline>
                      </fo:block>
                    </fo:table-cell>  
            		<fo:table-cell column-number="2">
              			<fo:block> </fo:block>
            		</fo:table-cell>
                  	<fo:table-cell column-number="3">
              			<fo:block> <fo:external-graphic content-width="scale-to-fit" width="150px" 
                                                        height="150px" src="logo-afpa.jpg"/></fo:block>
            		</fo:table-cell>
          		</fo:table-row>
        	</fo:table-body>
      	</fo:table>
          <fo:block>
            Je soussigné(e), <xsl:value-of select="document/afpa/responsable"/>
          </fo:block>
          <fo:block>
            du CENTRE DE LEVALLOIS LOUIS MICHEL
          </fo:block>
          <fo:block>
            Certifie que : 
            <fo:inline>
				<xsl:value-of select="document/personne/civilite"/> 
			</fo:inline> 
            <xsl:text>&#160;</xsl:text>
            <fo:inline>
				<xsl:value-of select="document/personne/prenom"/> 
			</fo:inline> 
            <xsl:text>&#160;</xsl:text>
            <fo:inline>
				<xsl:value-of select="document/personne/nom"/> 
			</fo:inline> 
            <xsl:text>&#160;</xsl:text>                        
          </fo:block>
          <fo:block>
            Né (e) le : 
            <xsl:value-of select="document/personne/date-de-naissance"/> 
          </fo:block>
          <fo:block>
            Adresse : 
            <xsl:value-of select="document/personne/adresse/ligne1"/> 
          </fo:block>  
           <fo:block>
            <fo:inline>
				<xsl:value-of select="document/personne/adresse/code-postal"/> 
			</fo:inline> 
            <xsl:text>&#160;</xsl:text>
            <fo:inline>
				<xsl:value-of select="document/personne/adresse/ville"/> 
			</fo:inline> 
          </fo:block>  
        </fo:flow>
      </fo:page-sequence>
    </fo:root>
  </xsl:template>
</xsl:stylesheet>