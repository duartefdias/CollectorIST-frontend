<template>
    <div>
        <h1 style="color: red;">Object Location</h1>
        <!--LOCATION-->
        <div class="mb">
            <h3>Localização da peça</h3>
            <!--USUAL LOCATION-->
            <h4>Localização Habitual</h4>
            <v-btn :color="usualLocationSelectedButton == 0 ? 'success' : 'info'" style="margin-left: 0px;" @click="toggleUsualLocationButton(0)">Localização IST</v-btn>
            <v-btn :color="usualLocationSelectedButton == 1 ? 'success' : 'info'" style="margin-left: 0px;" @click="toggleUsualLocationButton(1)">Coordenadas</v-btn>
            <v-btn :color="usualLocationSelectedButton == 2 ? 'success' : 'info'" style="margin-left: 0px;" @click="toggleUsualLocationButton(2)">Outra Localização</v-btn>
            <!--Coordinates-->
            <v-layout v-if="usualLocationSelectedButton == 1">
                <v-flex md5 style="margin-right: 15px;">
                    <v-text-field
                    v-model="location.usual.coordinates.lat"
                    label="Latitude"
                    v-on:input="updateStoreUsualLocation()"
                    solo
                    ></v-text-field>
                </v-flex>
                <v-flex md5>
                    <v-text-field
                    v-model="location.usual.coordinates.long"
                    label="Longitude"
                    v-on:input="updateStoreUsualLocation()"
                    solo
                    ></v-text-field>
                </v-flex>
            </v-layout>
            <!--Room-->
            <template v-if="usualLocationSelectedButton == 0">
                <v-layout>
                    <v-flex sm12 md12>
                        <span>Localização IST</span>
                    </v-flex>
                </v-layout>
                <!--Dropdown-->
                <v-select
                :items="locationsList"
                v-model="usualSelectedLocation"
                label="Espaço"
                v-on:change="getUsualLocationId()"
                solo
                ></v-select>
                <!--ChildNode-->
                <UsualLocationNode v-if="usualSelectedLocation.length > 0" :parentId="usualSelectedLocationId" :key="currentLocationChildKey"/>
                <!--Cabinet-->
                <template v-if="usualSelectedLocation.length > 0">
                    <v-layout>
                    <v-flex sm12 md12>
                        <span>Sub-localização (opcional)</span>
                    </v-flex>
                </v-layout>
                    <v-text-field
                    v-model="location.usual.istSpace.cabinet"
                    label="Armário"
                    v-on:input="updateStoreUsualLocation()"
                    solo
                    ></v-text-field>
                    <v-text-field
                    v-model="location.usual.istSpace.drawer"
                    label="Prateleira/Gaveta"
                    v-on:input="updateStoreUsualLocation()"
                    solo
                    ></v-text-field>
                    <v-text-field
                    v-model="location.usual.istSpace.position"
                    label="Posição"
                    v-on:input="updateStoreUsualLocation()"
                    solo
                    ></v-text-field>
                </template>
            </template>
            <!--ADDRESS-->
            <template v-if="usualLocationSelectedButton == 2">
                <v-text-field
                v-model="location.usual.address.name"
                label="Morada"
                v-on:input="updateStoreUsualLocation()"
                solo
                ></v-text-field>
            </template>
            <!--CURRENT LOCATION-->
            <h4>Localização atual</h4>
            <v-btn :color="currentLocationSelectedButton == 0 ? 'success' : 'info'" style="margin-left: 0px;" @click="toggleCurrentLocationButton(0)">Localização habitual</v-btn>
            <v-btn :color="currentLocationSelectedButton == 1 ? 'success' : 'info'" style="margin-left: 0px;" @click="toggleCurrentLocationButton(1)">Localização IST</v-btn>
            <v-btn :color="currentLocationSelectedButton == 2 ? 'success' : 'info'" style="margin-left: 0px;" @click="toggleCurrentLocationButton(2)">Coordenadas</v-btn>
            <v-btn :color="currentLocationSelectedButton == 3 ? 'success' : 'info'" style="margin-left: 0px;" @click="toggleCurrentLocationButton(3)">Outra Localização</v-btn>
            <template v-if="currentLocationSelectedButton == 0">
                <v-layout>
                    <v-flex sm12 md12>
                        <span>A localização atual é a mesma que a localização habitual.</span>
                    </v-flex>
                </v-layout>
            </template>
            <template v-if="currentLocationSelectedButton == 1">
                <v-layout>
                    <v-flex sm12 md12>
                        <span>Localização IST</span>
                    </v-flex>
                </v-layout>
                <!--Dropdown-->
                <v-select
                :items="locationsList"
                v-model="currentSelectedLocation"
                label="Espaço"
                v-on:change="getCurrentLocationId()"
                solo
                ></v-select>
                <!--Recursive ist current location-->
                <CurrentLocationNode v-if="currentSelectedLocation.length > 0" :parentId="currentSelectedLocationId" :key="usualLocationChildKey"/>
                <!--Cabinet-->
                <template v-if="currentSelectedLocation.length > 0">
                    <v-layout>
                        <v-flex sm12 md12>
                            <span>Sub-localização (opcional)</span>
                        </v-flex>
                    </v-layout>
                    <v-text-field
                    v-model="location.current.istSpace.cabinet"
                    label="Armário"
                    v-on:input="updateStoreCurrentLocation()"
                    solo
                    ></v-text-field>
                    <v-text-field
                    v-model="location.current.istSpace.drawer"
                    label="Prateleira/Gaveta"
                    v-on:input="updateStoreCurrentLocation()"
                    solo
                    ></v-text-field>
                    <v-text-field
                    v-model="location.current.istSpace.position"
                    label="Posição"
                    v-on:input="updateStoreCurrentLocation()"
                    solo
                    ></v-text-field>
                </template>
            </template>
            <!--Coordinate-->
            <v-layout v-if="currentLocationSelectedButton == 2">
                <v-flex md5 style="margin-right: 15px;">
                    <v-text-field
                    v-model="location.current.coordinates.lat"
                    label="Latitude"
                    v-on:input="updateStoreCurrentLocation()"
                    solo
                    ></v-text-field>
                </v-flex>
                <v-flex md5>
                    <v-text-field
                    v-model="location.current.coordinates.long"
                    label="Longitude"
                    v-on:input="updateStoreCurrentLocation()"
                    solo
                    ></v-text-field>
                </v-flex>
            </v-layout>
            <template v-if="currentLocationSelectedButton == 3">
                <v-text-field
                v-model="location.current.address.name"
                label="Morada"
                v-on:input="updateStoreCurrentLocation()"
                solo
                ></v-text-field>
            </template>
        </div>
    </div>
</template>

<script>
    // Tree nodes
    import UsualLocationNode from './treeNodes/UsualLocationNode'
    import CurrentLocationNode from './treeNodes/CurrentLocationNode'
    // Api
    import axios from 'axios'
    // Store
    import AssetInsertionLocationStore from './store/AssetInsertionLocationStore.js'
    import AssetInsertionStore from '@/assets/store/AssetInsertionStore'

    export default {
        name: 'InsertObjectLocation',
        components: {
            UsualLocationNode,
            CurrentLocationNode
        },
        data() {
            return {
                rawLocations: [],
                locationsList: [],
                usualSelectedLocation: '',
                currentSelectedLocation: '',
                usualSelectedLocationId: null,
                currentSelectedLocationId: null,
                usualLocationChildKey: 0,
                currentLocationChildKey: 0,
                usualLocationSelectedButton: 0,
                currentLocationSelectedButton: 1,
                selectedButton: 1,
                location: {
                    usual: {
                        coordinates: {
                            lat: null,
                            long: null
                        },
                        istSpace: {
                            room: null,
                            cabinet: null,
                            drawer: null,
                            position: null,
                        },
                        address: {
                            name: null
                        }
                    },
                    current: {
                        coordinates: {
                            lat: null,
                            long: null
                        },
                        istSpace: {
                            room: null,
                            cabinet: null,
                            drawer: null,
                            position: null,
                        },
                        address: {
                            name: null
                        }
                    }
                }
            }
        },
        methods: {
            async getLocations() {
                var component = this
                await axios.get('https://fenix.tecnico.ulisboa.pt/api/fenix/v1/spaces')
                    .then((response) => {
                        this.rawLocations = response.data
                        this.rawLocations.forEach((subLocation) => {
                            this.locationsList.push(subLocation.name)
                        })
                    })
            },
            getUsualLocationId() {
                // Get id of selected location
                let selectedLocationIndex = this.rawLocations.findIndex(x => x.name == this.usualSelectedLocation)
                this.usualSelectedLocationId = this.rawLocations[selectedLocationIndex].id

                // Update usual location in store
                AssetInsertionLocationStore.setUsualIstId(this.usualSelectedLocationId)
                AssetInsertionStore.setObjectLocation(AssetInsertionLocationStore.getLocation())

                // Update children
                this.usualLocationChildKey += 1
            },
            getCurrentLocationId() {
                // Get id of selected location
                let selectedLocationIndex = this.rawLocations.findIndex(x => x.name == this.currentSelectedLocation)
                this.currentSelectedLocationId = this.rawLocations[selectedLocationIndex].id

                // Update current location in store
                AssetInsertionLocationStore.setCurrentIstId(this.currentSelectedLocationId)
                AssetInsertionStore.setObjectLocation(AssetInsertionLocationStore.getLocation())

                // Update children
                this.currentLocationChildKey += 1
            },
            toggleUsualLocationButton(selectedButton) {
                this.selectedButton = selectedButton
                this.usualLocationSelectedButton = selectedButton
                this.location.usual.coordinates.lat = null
                this.location.usual.coordinates.long = null
                this.location.usual.istSpace.room = null
                this.usualSelectedLocation = ''
                this.location.usual.istSpace.cabinet = null
                this.location.usual.istSpace.drawer = null
                this.location.usual.istSpace.position = null
                this.location.usual.address.name = null
                this.updateStoreUsualLocation()
                this.updateMainStore()
            },
            toggleCurrentLocationButton(selectedButton) {
                this.selectedButton = selectedButton
                this.currentLocationSelectedButton = selectedButton
                this.location.current.coordinates.lat = null
                this.location.current.coordinates.long = null
                this.location.current.istSpace.room = null
                this.currentSelectedLocation = ''
                this.location.current.istSpace.cabinet = null
                this.location.current.istSpace.drawer = null
                this.location.current.istSpace.position = null
                this.location.current.address.name = null
                this.updateStoreCurrentLocation()
                this.updateMainStore()
            },
            updateStoreUsualLocation() {
                AssetInsertionLocationStore.setUsualCoordinates(this.location.usual.coordinates.lat, this.location.usual.coordinates.long)
                AssetInsertionLocationStore.setUsualIstSubLocation(this.location.usual.istSpace.cabinet, this.location.usual.istSpace.drawer, this.location.usual.istSpace.position)
                AssetInsertionLocationStore.setUsualAddress(this.location.usual.address.name)
            },
            updateStoreCurrentLocation() {
                if(this.selectedButton === 0) {
                    let usualLocation = AssetInsertionLocationStore.getUsualLocation()
                    AssetInsertionLocationStore.setCurrentCoordinates(usualLocation.coordinates.lat, usualLocation.coordinates.long)
                    AssetInsertionLocationStore.setCurrentIstSubLocation(usualLocation.istSpace.cabinet, usualLocation.istSpace.drawer, usualLocation.istSpace.position)
                    AssetInsertionLocationStore.setCurrentAddress(usualLocation.address.name)
                }
                else {
                    AssetInsertionLocationStore.setCurrentCoordinates(this.location.current.coordinates.lat, this.location.current.coordinates.long)
                    AssetInsertionLocationStore.setCurrentIstSubLocation(this.location.current.istSpace.cabinet, this.location.current.istSpace.drawer, this.location.current.istSpace.position)
                    AssetInsertionLocationStore.setCurrentAddress(this.location.current.address.name)
                }
            },
            updateMainStore() {
                AssetInsertionStore.setObjectLocation(AssetInsertionLocationStore.getLocation())
            }
        },
        created() {
            this.getLocations()
            console.log()
        }
    }
</script>

<style scoped>

</style>

