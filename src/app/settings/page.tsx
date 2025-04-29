import React from 'react'

const SettingsPage = () => {
  return (
    <div className="page-content">
      <div className="max-w-7xl mx-auto">
        <div className="page-header">
          <h2>Configurações</h2>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Company Information Card */}
          <div className="card">
            <div className="card-body">
              <h5 className="card-title">Informações da Empresa</h5>
              <form>
                <div className="mb-4">
                  <label htmlFor="company-name" className="block text-sm font-medium text-gray-700 mb-1">
                    Nome da Empresa
                  </label>
                  <input
                    type="text"
                    id="company-name"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md"
                    defaultValue="SeguroBroker, Lda."
                  />
                </div>
                <div className="mb-4">
                  <label htmlFor="company-email" className="block text-sm font-medium text-gray-700 mb-1">
                    Email
                  </label>
                  <input
                    type="email"
                    id="company-email"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md"
                    defaultValue="info@segurobroker.pt"
                  />
                </div>
                <div className="mb-4">
                  <label htmlFor="company-phone" className="block text-sm font-medium text-gray-700 mb-1">
                    Telefone
                  </label>
                  <input
                    type="text"
                    id="company-phone"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md"
                    defaultValue="+351 210 123 456"
                  />
                </div>
                <div className="mb-4">
                  <label htmlFor="company-address" className="block text-sm font-medium text-gray-700 mb-1">
                    Morada
                  </label>
                  <textarea
                    id="company-address"
                    rows={3}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md"
                    defaultValue="Av. da Liberdade, 110, 1250-146 Lisboa"
                  />
                </div>
                <button
                  type="submit"
                  className="btn btn-primary"
                >
                  Guardar Alterações
                </button>
              </form>
            </div>
          </div>

          {/* API Integrations Card */}
          <div className="card">
            <div className="card-body">
              <h5 className="card-title">Integrações API</h5>
              
              {/* Fidelidade API */}
              <div className="mb-6">
                <div className="flex justify-between items-center mb-2">
                  <div>
                    <h6 className="font-medium">Fidelidade API</h6>
                    <small className="text-gray-500">Integração para cotações automáticas</small>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input type="checkbox" className="sr-only peer" defaultChecked />
                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                  </label>
                </div>
                <div className="mb-4">
                  <label htmlFor="fidelidade-api-key" className="block text-sm font-medium text-gray-700 mb-1">
                    API Key
                  </label>
                  <input
                    type="password"
                    id="fidelidade-api-key"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md"
                    defaultValue="••••••••••••••••"
                  />
                </div>
              </div>

              {/* Ageas API */}
              <div className="mb-6">
                <div className="flex justify-between items-center mb-2">
                  <div>
                    <h6 className="font-medium">Ageas API</h6>
                    <small className="text-gray-500">Integração para cotações automáticas</small>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input type="checkbox" className="sr-only peer" defaultChecked />
                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                  </label>
                </div>
                <div className="mb-4">
                  <label htmlFor="ageas-api-key" className="block text-sm font-medium text-gray-700 mb-1">
                    API Key
                  </label>
                  <input
                    type="password"
                    id="ageas-api-key"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md"
                    defaultValue="••••••••••••••••"
                  />
                </div>
              </div>

              {/* Allianz API */}
              <div className="mb-6">
                <div className="flex justify-between items-center mb-2">
                  <div>
                    <h6 className="font-medium">Allianz API</h6>
                    <small className="text-gray-500">Integração para cotações automáticas</small>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input type="checkbox" className="sr-only peer" />
                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                  </label>
                </div>
                <div className="mb-4">
                  <label htmlFor="allianz-api-key" className="block text-sm font-medium text-gray-700 mb-1">
                    API Key
                  </label>
                  <input
                    type="password"
                    id="allianz-api-key"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md"
                    placeholder="Insira a API Key"
                  />
                </div>
              </div>

              <button
                type="button"
                className="btn btn-primary"
              >
                Guardar Configurações
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default SettingsPage