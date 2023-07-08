<?xml version="1.0" encoding="utf-8" ?>
<xsl:stylesheet version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform">
    <xsl:output method="html" encoding="utf-8" indent="yes" />
    <xsl:template match="/">
        <html>
            <table border="1">
                <tr>
                    <th>Name</th>
                    <th>Age</th>
                    <th>Gender</th>
                    <th>City</th>
                    <th>Country</th>

                </tr>
                <xsl:for-each select="persons/person">
                <tr>
                    <td><xsl:value-of select="name" /></td>
                    <td><xsl:value-of select="age" /></td>
                    <td><xsl:value-of select="gender" /></td>
                    <td><xsl:value-of select="city" /></td>
                    <td><xsl:value-of select="country" /></td>
                </tr>
                </xsl:for-each>
            </table>
        </html>
    </xsl:template>
</xsl:stylesheet>
