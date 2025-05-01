package weaveandthewheel

import weaveandthewheel.dataClasses.CatalogData

interface Cataloger {
    /**
     * Catalogs the provided content data into the User Catalog.
     *
     * @param catalogData an instance of CatalogData that includes details such as user ID, S3 key, title,
     * description, and content type for the content being cataloged
     * @return true if the cataloging process is successful; false otherwise
     */
    suspend fun catalogContent(catalogData: CatalogData): Boolean
}