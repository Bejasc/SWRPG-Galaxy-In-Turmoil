import { BlobServiceClient, ContainerClient } from "@azure/storage-blob";

export async function getAzureContainer(containerName = "swrpg-images"): Promise<ContainerClient> {
	const azureStore =
		"https://drpg.blob.core.windows.net/?sv=2020-08-04&ss=bfqt&srt=sco&sp=rwdlacupitf&se=2023-01-23T14:34:31Z&st=2022-01-23T06:34:31Z&spr=https&sig=WAw9y9nn0mL%2Ft%2FjQsuy4w%2BZ6ptEKNEGh8QGc2Leyffc%3D";

	const blobServiceClient = new BlobServiceClient(azureStore);
	const containerClient = blobServiceClient.getContainerClient(containerName);

	await containerClient.createIfNotExists();

	return containerClient;
}

export async function deleteBlobByName(blobName: string, containerName = "swrpg-images"): Promise<boolean> {
	const containerClient = await getAzureContainer(containerName);
	await containerClient.deleteBlob(blobName);
	return true;
}

export async function updateBlobTags(blobName: string, tags: Record<string, string>, containerName = "swrpg-images") {
	const containerClient = await getAzureContainer(containerName);
	const blobClient = containerClient.getBlobClient(blobName);
	await blobClient.setTags(tags);
}
